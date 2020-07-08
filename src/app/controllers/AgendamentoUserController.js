const {
  parseISO,
  startOfHour,
  isBefore,
  format,
  subHours,
} = require('date-fns');
const Yup = require('yup');
const Agendamento = require('../models/Agendamento');
const Provider = require('../models/Provider');
const File = require('../models/File');
const Pet = require('../models/Pet');

class AgendamentoUserController {
  async getAcceptedSchedules(req, res) {
    const { page = 1 } = req.query;
    const agendamento = await Agendamento.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
        accept: true,
      },
      include: [
        {
          model: Provider,
          as: 'provider',
          attributes: ['name', 'email', 'clinica', 'passeador', 'adestrador'],

          include: [
            { model: File, as: 'avatar' },
          ],
        },
        {
          model: Pet,
          as: 'pets',
          include: [
            { model: File, as: 'avatar' },
          ],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
    });
    return res.json(agendamento);
  }

  async getUnconfirmedSchedules(req, res) {
    const { page = 1 } = req.query;
    const agendamento = await Agendamento.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
        accept: null,
      },
      include: [
        {
          model: Provider,
          as: 'provider',
          attributes: ['name', 'email'],

          include: [
            { model: File, as: 'avatar' },
          ],
        },
        {
          model: Pet,
          as: 'pets',
          include: [
            { model: File, as: 'avatar' },
          ],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
    });
    return res.json(agendamento);
  }

  async getAcceptedSchedulesFromProvider(req, res) {
    const { page = 1 } = req.query;
    const agendamento = await Agendamento.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
        provider_id: req.params.providerId,
        accept: true,
      },
      include: [
        {
          model: Provider,
          as: 'provider',
          attributes: ['name', 'email'],

          include: [
            { model: File, as: 'avatar' },
          ],
        },
        {
          model: Pet,
          as: 'pets',
          include: [
            { model: File, as: 'avatar' },
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
      payment: Yup.string(),
      agendamentos: Yup.array().required(),
    });

    const { agendamentos } = req.body;
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const response = [];

    for (const agendamento_id of agendamentos) {
      const agendamento = await Agendamento.findByPk(agendamento_id);

      if (!agendamento) {
        return res.status(400).json({ error: 'agendamento não encontrado' });
      }

      await agendamento.update({ ...req.body, accept: true });

      response.push(agendamento);
    }

    return res.json(response);
  }

  async cancelAppointment(req, res) {
    const agendamento = await Agendamento.findByPk(req.params.id);
    if (!agendamento) {
      return res.status(400).json({ error: 'agendamento não encontrado' });
    }
    if (agendamento.user_id !== req.userId) {
      return res
        .status(401)
        .json({
          error: 'você não tem permissão para cancelar esse agendamento',
        });
    }

    const dateWithSub = subHours(agendamento.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res
        .status(401)
        .json({
          error: 'o agandamento só pode ser cancelado com 2 horas de antecedencia',
        });
    }

    agendamento.canceled_at = new Date();

    await agendamento.save();

    return res.json(agendamento);
  }
}

module.exports = new AgendamentoUserController();
