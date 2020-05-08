/* eslint-disable camelcase */
const Yup = require('yup');
const {
  parseISO,
  startOfHour,
  isBefore,
  format,
  subHours,
} = require('date-fns');
const pt = require('date-fns/locale/pt');
const Agendamento = require('../models/Agendamento');
const File = require('../models/File');
const Provider = require('../models/Provider');
const User = require('../models/User');
const Notification = require('../models/Notification');

class AgendamentoController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const agendamento = await Agendamento.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,

      },
      include: [
        {
          model: Provider,
          as: 'provider',
          attributes: ['name', 'email'],

          include: [
            { model: File, as: 'avatar', attributes: ['id', 'name', 'url'] },
          ],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
    });
    return res.json(agendamento);
  }

  async show(req, res) {
    const { page = 1 } = req.query;
    const agendamento = await Agendamento.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
        provider_id: req.params.providerId,
      },
      include: [
        {
          model: Provider,
          as: 'provider',
          attributes: ['name', 'email'],

          include: [
            { model: File, as: 'avatar', attributes: ['id', 'name', 'url'] },
          ],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
    });
    return res.json(agendamento);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      user_id: Yup.number().required(),
      pet_id: Yup.number().required(),
      value: Yup.string().required(),
      description: Yup.string().required(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      user_id, date, value, description, payment, pet_id,

    } = req.body;

    const hourStart = startOfHour(parseISO(date));

    // Verifica se a data passou
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // Verifica se a data esta disponivel
    const checkAvailability = await Agendamento.findOne({
      where: {
        date: hourStart,
        provider_id: req.providerId,
        canceled_at: null,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Data de agendamento nao disponivel' });
    }

    const agendamento = await Agendamento.create({
      user_id,
      date: hourStart,
      provider_id: req.providerId,
      value,
      description,
      payment,
      pet_id,
    });

    /**
     * Notifica prestador de serviços sobre novo agendamento
     */
    const user = await User.findByPk(req.userId);

    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt },
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate} `,
      provider_id: req.providerId,
      user_id,
    });

    return res.json(agendamento);
  }

  async delete(req, res) {
    const agendamento = await Agendamento.findByPk(req.params.id);
    if (!agendamento) {
      return res.status(400).json({ error: 'Appointtment does not exist' });
    }
    if (agendamento.user_id !== req.userId) {
      return res
        .status(401)
        .json({
          error: "You don't heve permission to cancel this appointment",
        });
    }

    const dateWithSub = subHours(agendamento.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res
        .status(401)
        .json({
          error: 'You cant only cancel appointments 2 hours in advance',
        });
    }

    agendamento.canceled_at = new Date();

    await agendamento.save();

    return res.json(agendamento);
  }
}

module.exports = new AgendamentoController();
