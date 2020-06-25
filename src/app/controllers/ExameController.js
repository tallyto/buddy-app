const Exame = require('../models/Exame');
const Provider = require('../models/Provider');

class ExameController {
  async index(req, res) {
    const exames = await Exame.findAll();
    return res.json(exames);
  }

  async getPetExames(req, res) {
    const exames = await Exame.findAll({
      where: {
        pet_id: req.params.id,
      },
      include: [{ model: Provider, as: 'providers', attributes: ['name'] }],
    });

    return res.json(exames);
  }

  async store(req, res) {
    const exames = await Exame.create(
      {
        ...req.body,
        data: Date.now(),
        provider_id: req.providerId,
      },
    );
    return res.json(exames);
  }

  async update(req, res) {
    const exames = await Exame.findByPk(req.params.id);
    await exames.update(req.body);
    return res.json(exames);
  }

  async delete(req, res) {
    const exames = await Exame.findByPk(req.params.id);
    await exames.destroy();
    return res.json();
  }
}

module.exports = new ExameController();
