const Consulta = require('../models/Consulta');

class ConsultaController {
  async index(req, res) {
    const consulta = await Consulta.findAll();

    return res.json(consulta);
  }

  async show(req, res) {
    const consultas = await Consulta.findAll({
      where: {
        provider_id: req.providerId,
      },
    });

    return res.json(consultas);
  }

  async create(req, res) {
    const consulta = await Consulta.create({
      ...req.body,
      provider_id: req.providerId,
      data: new Date(),
    });
    return res.json(consulta);
  }

  async update(req, res) {
    const consulta = await Consulta.findByPk(req.params.id);

    await consulta.update(req.body);

    return res.json(consulta);
  }

  async delete(req, res) {
    const consulta = await Consulta.findByPk(req.params.id);

    await consulta.destroy();

    return res.json();
  }
}

module.exports = new ConsultaController();
