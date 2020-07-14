const Yup = require('yup');

const Pets = require('../models/Pet');
const User = require('../models/User');
const File = require('../models/File');
const { formatIdade } = require('../utils/data');

class PetsController {
  async getUserPets(req, res) {
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

  async getPetAged(req, res) {
    const pet = await Pets.findByPk(req.params.id);
    if (!pet) {
      return res.status(400).json({ error: 'pet não encontrado' });
    }
    const { nascimento } = pet;

    const idade = formatIdade(nascimento);

    return res.json({ pet, idade });
  }

  async createPet(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('precisa informar o nome'),
      raca: Yup.string().required('precisa informar a raça'),
      especie: Yup.string().required('precisa informar a especie'),
      pelagem: Yup.string().required('precisa informar a pelagem'),
      sexo: Yup.string().required('precisa informar o sexo'),
      condicao: Yup.string().required('precisa informar a condição'),
      temperamento: Yup.string().required('precisa informar o temperamento'),
      nascimento: Yup.string().required('precisa informar o nascimento'),
    });

    try {
      await schema.validate(req.body);
      if (req.body.avatar_id) {
        const file = await File.findByPk(req.body.avatar_id);
        if (!file) {
          return res.status(400).json({ error: 'foto não encontrada' });
        }
      }

      const pets = await Pets.create({
        ...req.body,
        user_id: req.userId,
      });

      return res.json(pets);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updatePet(req, res) {
    const pet = await Pets.findByPk(req.params.id);

    if (!pet) {
      return res.status(400).json({ error: 'pet não encontrado' });
    }

    if (pet.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'você não tem permissão para atualizar esse pet' });
    }

    if (req.body.avatar_id) {
      const file = await File.findByPk(req.body.avatar_id);
      if (!file) {
        return res.status(400).json({ error: 'foto não encontrada' });
      }
    }

    await pet.update(req.body);

    return res.json(pet);
  }

  async removePet(req, res) {
    const pet = await Pets.findByPk(req.params.id);

    if (!pet) {
      return res.status(400).json({ error: 'pet não encontrado' });
    }

    if (pet.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'você não tem permissão ara remover esse pet' });
    }

    await pet.destroy();

    return res.json();
  }
}

module.exports = new PetsController();
