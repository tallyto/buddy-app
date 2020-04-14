/* eslint-disable camelcase */
const Yup = require('yup');
const Vacinas = require('../models/Vacina');
const Pet = require('../models/Pet');

class PetsController {
  async index(req, res) {
    const vacinas = await Vacinas.findAll(
      { include: [{ model: Pet, as: 'pets' }] },
    );

    return res.json(vacinas);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      tipo: Yup.string().required(),
      pet_id: Yup.number().required(),
      validade: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { tipo, pet_id, validade } = req.body;

    const data = new Date();
    const vacinas = await Vacinas.create({
      data,
      tipo,
      pet_id,
      validade,
    });

    return res.json(vacinas);
  }

  async delete(req, res) {
    const vacina = await Vacinas.findByPk(req.params.id);
    if (!vacina) {
      return res.status(400).json({ error: 'Vacina does exist' });
    }

    await vacina.destroy();

    return res.json();
  }
}

module.exports = new PetsController();
