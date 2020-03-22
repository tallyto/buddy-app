/* eslint-disable camelcase */
const Yup = require('yup');
const Pets = require('./../models/Pet');

class PetsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      raca: Yup.string().required(),
      genero: Yup.string().required(),
      descricao: Yup.string().required(),
      nascimento: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      name, raca, genero, descricao, nascimento,
    } = req.body;

    const pets = await Pets.create({
      user_id: req.userId,
      name,
      raca,
      genero,
      descricao,
      nascimento,

    });


    return res.json(pets);
  }

  async index(req, res) {
    const pets = await Pets.findAll({ where: { user_id: req.userId } });
    return res.json(pets);
  }
}

module.exports = new PetsController();
