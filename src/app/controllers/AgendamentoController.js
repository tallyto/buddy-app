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

const Notification = require('../models/Notification');

class AgendamentoController {
  async index(req, res) {
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

  async show(req, res) {
    const { page = 1 } = req.query;
    const agendamento = await Agendamento.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
    });
    return res.json(agendamento);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
      pet_id: Yup.number().required(),
      value: Yup.string().required(),
      description: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      user_id, date, value, description, pet_id,
    } = req.body;

    const pet = await Pet.findByPk(pet_id);
    if (!pet) {
      return res.status(401).json({
        error: 'Você precisa informar um pet para cadastrar um agendamento',
      });
    }

    const agendamentos = [];
    for (const datas of date) {
      const hourStart = startOfHour(parseISO(datas));

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
        pet_id,
      });

      agendamentos.push(agendamento);
    }


    /**
     * Notifica prestador de serviços sobre novo agendamento
     */
    // const user = await User.findByPk(req.userId);

    // const formattedDate = format(
    //   hourStart,
    //   "'dia' dd 'de' MMMM', às' H:mm'h'",
    //   { locale: pt },
    // );

    // await Notification.create({
    //   content: `Novo agendamento de ${user.name} para ${formattedDate} `,
    //   provider_id: req.providerId,
    //   user_id,
    // });

    return res.json(agendamentos);
  }
}

module.exports = new AgendamentoController();
