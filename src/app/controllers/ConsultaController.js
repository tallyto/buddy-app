const Consulta = require('../models/Consulta');
const Pet = require('../models/Pet');
const User = require('../models/User');


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
      include: [{ model: Pet, as: 'pets', include: [{ model: User, as: 'user', attributes: ['name'] }] }],
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
