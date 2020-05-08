const Agendamento = require('../models/Agendamento');

class AgendamentoUserController {
  async store(req, res) {
    const agendamento = await Agendamento.findByPk(req.params.id);
    if (!agendamento) {
      return res.status(400).json({ error: 'Agendamento não existe' });
    }

    if (agendamento.user_id !== req.userId) {
      return res.status(401).json({ error: 'Você não pode aceitar um agendamento que não lhe pertence' });
    }

    agendamento.accept = true;

    await agendamento.update();

    return res.json(agendamento);
  }
}


module.exports = new AgendamentoUserController();
