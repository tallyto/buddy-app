const Consultas = require('../models/Consulta');
const Provider = require('../models/Provider');

class HistoricoController {
  async show(req, res) {
    const consulta = await Consultas.findAll({
      where: {
        pet_id: req.params.id,
      },
      include: [{ model: Provider, as: 'providers', attributes: ['name'] }],
      order: [['data', 'desc']],
    });

    return res.json(consulta);
  }
}

module.exports = new HistoricoController();
