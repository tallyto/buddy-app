const Yup = require('yup');
const Vacinas = require('../models/Vacina');
const Pet = require('../models/Pet');

class VacinaController {
  async show(req, res) {
    const vacinas = await Vacinas.findAll({
      where: {
        pet_id: req.params.id,
      },
    });

    return res.json(vacinas);
  }

  async store(req, res) {
    const pet = await Pet.findByPk(req.body.pet_id);

    if (!pet) {
      return res.status(400).json({ error: 'Pet não encontrado' });
    }

    const data = new Date();

    const vacinas = await Vacinas.create({ ...req.body, data });

    return res.json(vacinas);
  }

  async delete(req, res) {
    const vacina = await Vacinas.findByPk(req.params.id);

    if (!vacina) {
      return res.status(400).json({ error: 'vacina não encontrada' });
    }

    await vacina.destroy();

    return res.json();
  }
}

module.exports = new VacinaController();
