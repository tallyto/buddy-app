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
        },
        {
          association: 'vacinas',
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
        },
        {
          association: 'vacinas',
        },
      ],
    });

    return res.json(pets);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      raca: Yup.string().required(),
      especie: Yup.string().required(),
      pelagem: Yup.string().required(),
      sexo: Yup.string().required(),
      condicao: Yup.string().required(),
      temperamento: Yup.string().required(),
      nascimento: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
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
      especie: Yup.string(),
      pelagem: Yup.string(),
      sexo: Yup.string(),
      condicao: Yup.string(),
      temperamento: Yup.string(),

      nascimento: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const pet = await Pets.findByPk(req.params.id);

    if (!pet) {
      return res.status(400).json({ error: 'Pet não cadastrado' });
    }

    if (pet.user_id !== req.userId) {
      return res.status(401).json({ error: 'Você não pode atualizar um pet que não é seu' });
    }

    // Verifica se o avatar é valido
    if (req.body.avatar_id) {
      const file = await File.findByPk(req.body.avatar_id);
      if (!file) {
        return res.status(400).json({ error: 'Foto do pet não encontrada' });
      }
    }

    await pet.update(req.body);

    return res.json(pet);
  }

  async delete(req, res) {
    const pet = await Pets.findByPk(req.params.id);

    if (!pet) {
      return res.status(400).json({ error: 'Pet não encontrado' });
    }

    if (pet.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para remover esse pet' });
    }

    await pet.destroy();

    return res.json();
  }
}

module.exports = new PetsController();
