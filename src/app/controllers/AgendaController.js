const { startOfDay, endOfDay, parseISO } = require('date-fns');
const { Op } = require('sequelize');
const Agendamentos = require('../models/Agendamento');

class AgendaController {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);
    const agendamentos = await Agendamentos.findAll({
      where: {
        provider_id: req.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });
    return res.json(agendamentos);
  }
}
module.exports = new AgendaController();
