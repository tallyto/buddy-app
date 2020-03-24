/* eslint-disable camelcase */
const Yup = require('yup');
const Pets = require('./../models/Pet');
const User = require('./../models/User');

class PetsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      raca: Yup.string().required(),
      genero: Yup.string().required(),
      descricao: Yup.string().required(),
      idade: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      name, raca, genero, descricao, idade,
    } = req.body;

    const pets = await Pets.create({
      user_id: req.userId,
      name,
      raca,
      genero,
      descricao,
      idade,
    });

    return res.json(pets);
  }

  async index(req, res) {
    const pets = await Pets.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });
    return res.json(pets);
  }

  async show(req, res) {
    const pets = await Pets.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(pets);
  }
}

module.exports = new PetsController();
