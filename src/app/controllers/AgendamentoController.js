/* eslint-disable camelcase */
const Yup = require('yup');
const {
  parseISO, startOfHour, isBefore, format, subHours,
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
          include: [{ model: File, as: 'avatar' }],
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
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    const hourStart = startOfHour(parseISO(date));
    // Verifica se a data passou
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }
    // Verifica se a data esta disponivel
    const checkAvailability = await Agendamento.findOne({
      where: {
        date: hourStart,
        provider_id,
        canceled_at: null,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Data de agendamento nao disponivel' });
    }

    const agendamento = await Agendamento.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
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
      provider_id,
      user_id: req.userId,
    });

    return res.json(agendamento);
  }

  async delete(req, res) {
    const agendamento = await Agendamento.findByPk(req.params.id);
    if (agendamento.user_id !== req.userId) {
      return res.status(401).json({ error: "You don't heve permission to cancel this appointment" });
    }

    const dateWithSub = subHours(agendamento.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({ error: 'You cant only cancel appointments 2 hours in advance' });
    }

    agendamento.canceled_at = new Date();

    await agendamento.save;

    return res.json(agendamento);
  }
}

module.exports = new AgendamentoController();
