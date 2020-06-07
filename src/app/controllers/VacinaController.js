const Yup = require('yup');
const Vacinas = require('../models/Vacina');
const Pet = require('../models/Pet');

class VacinaController {
  async index(req, res) {
    const vacinas = await Vacinas.findAll({
      attributes: ['id', 'vacina', 'data', 'revacinar', 'peso'],
      include: [
        {
          model: Pet,
          as: 'pets',
        },
      ],
    });

    return res.json(vacinas);
  }

  async show(req, res) {
    const vacinas = await Vacinas.findAll({
      where: {
        pet_id: req.params.id,
      },
    });

    return res.json(vacinas);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      vacina: Yup.string().required(),
      pet_id: Yup.number().required(),
      revacinar: Yup.date().required(),
      peso: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const pet = await Pet.findByPk(req.body.pet_id);

    if (!pet) {
      return res.status(400).json({ error: 'Pet does not exist' });
    }

    const data = new Date();

    const vacinas = await Vacinas.create({ ...req.body, data });

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

module.exports = new VacinaController();
