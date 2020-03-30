/* eslint-disable camelcase */
const Yup = require('yup');
const Agendamento = require('./../models/Agendamento');
const User = require('./../models/User');
const Provider = require('./../models/Provider');

class AgendamentoController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const agendamento = await Agendamento.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      include: [
        { model: User, as: 'user', attributes: ['name', 'email'] },
        { model: Provider, as: 'provider', attributes: ['name', 'email'] },
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

    const agendamento = await Agendamento.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(agendamento);
  }
}

module.exports = new AgendamentoController();
