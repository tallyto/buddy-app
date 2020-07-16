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
    const schema = Yup.object().shape({
      user_id: Yup.number().required('usuário é obrigatório'),
      pet_id: Yup.number().required('pet é obrigatório'),
      value: Yup.string().required('valor é obrigatório'),
      description: Yup.string().required('descrição é obrigatória'),
      date: Yup.array().required('data agendamento obrigatória')
    });

    try {
      const {
        user_id, date, value, description, pet_id,
      } = req.body;

      await schema.validate(req.body)

      for (const agendamento of date) {
        const hourStart = startOfHour(parseISO(agendamento));
        const agendamentos = [];

        // Verifica se a data passou
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

        const agendamento = await Agendamento.create({
          user_id,
          date: hourStart,
          provider_id: req.providerId,
          value,
          description,
          pet_id,
        });

        agendamentos.push(agendamento);
        return res.json(agendamentos);
      }

    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

module.exports = new AgendamentoController();
