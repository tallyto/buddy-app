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
          attributes: ['id', 'name', 'url'],
        },
        {
          association: 'vacinas',
          attributes: ['id', 'vacina', 'data', 'revacinar', 'peso'],
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
          attributes: ['id', 'name', 'url'],
        },
        {
          association: 'vacinas',
          attributes: ['id', 'vacina', 'data', 'revacinar', 'peso'],
        },
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
      nascimento: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const pets = await Pets.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(pets);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      raca: Yup.string(),
      genero: Yup.string(),
      descricao: Yup.string(),
      nascimento: Yup.date(),
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

    const pet = await Pets.findByPk(req.params.id);
    await pet.update(req.body);

    return res.json(pet);
  }

  async delete(req, res) {
    const pet = await Pets.findByPk(req.params.id);

    if (!pet) {
      return res.status(400).json({ error: 'Pet does not exist' });
    }

    if (pet.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permition for delete this pet" });
    }

    await pet.destroy();

    return res.json();
  }
}

module.exports = new PetsController();
