/* eslint-disable camelcase */
const Yup = require('yup');
const Pets = require('../models/Pet');
const User = require('../models/User');
const File = require('../models/File');

class PetsController {
  async index(req, res) {
    const pets = await Pets.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'name', 'url'],
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
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'name', 'url'],
        }, { association: 'vacinas' },
      ],
    });

    return res.json(pets);
  }

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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      raca: Yup.string(),
      genero: Yup.string(),
      descricao: Yup.string(),
      idade: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verifica se o avatar é valido
    if (req.body.avatar_id) {
      const file = await File.findByPk(req.body.avatar_id);
      if (!file) {
        return res.status(400).json({ error: 'Avatar not exist' });
      }
    }

    const pet = await Pets.findByPk(req.params.petId);
    const newPet = await pet.update(req.body);

    return res.json(newPet);
  }
}

module.exports = new PetsController();
