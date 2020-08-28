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
const Pet = require('../models/Pet');

class AgendamentoController {
  async getProviderAppointmens(req, res) {
    const { page = 1 } = req.query;
    const agendamento = await Agendamento.findAll({
      where: {
        provider_id: req.providerId,
        canceled_at: null,
        accept: true,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
          include: [{ model: File, as: 'avatar' }, { association: 'enderecos' }],
        },
        { model: Pet, as: 'pets', include: [{ model: File, as: 'avatar' }] },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
    });
    return res.json(agendamento);
  }

  async store(req, res) {
    const agendamentos = [];
    const {
      user_id, date, value, description, pet_id,
    } = req.body;

    for (const agendamento of date) {
      const hourStart = parseISO(agendamento);
      if (isBefore(hourStart, new Date())) {
        return res.status(400).json({ error: 'datas passadas não são permitidas' });
      }

      // // Verifica se a data esta disponivel
      // const checkAvailability = await Agendamento.findOne({
      //   where: {
      //     date: hourStart,
      //     provider_id: req.providerId,
      //     canceled_at: null,
      //   },
      // });

      // if (checkAvailability) {
      //   return res
      //     .status(400)
      //     .json({ error: 'Data de agendamento nao disponivel' });
      // }

      const agendado = await Agendamento.create({
        user_id,
        date: hourStart,
        provider_id: req.providerId,
        value,
        description,
        pet_id,
      });

      agendamentos.push(agendado);
    }

    return res.json(agendamentos);
  }

  async cancelarAgendamento(req, res) {
    const agendamento = await Agendamento.findByPk(req.params.id);
    const provider = await Provider.findByPk(req.providerId)

    if (!agendamento) {
      return res.status(400).json({ error: 'agendamento não encontrado' });
    }
    // const dateWithSub = subHours(agendamento.date, 2);
    // if (isBefore(dateWithSub, new Date())) {
    //   return res
    //     .status(401)
    //     .json({
    //       error: 'o agandamento só pode ser cancelado com 2 horas de antecedencia',
    //     });
    // }
    provider.avaliacao = (provider.avaliacao - 0.5).toFixed(2)
    await provider.save()
    agendamento.canceled_at = new Date();
    await agendamento.save();
    return res.json(agendamento);
  }
}

module.exports = new AgendamentoController();
