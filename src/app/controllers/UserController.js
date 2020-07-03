const Yup = require('yup');
const User = require('../models/User');
const File = require('../models/File');

class UserController {
  async index(req, res) {
    const user = await User.findAll({
      attributes: ['id', 'email', 'name', 'telefone', 'avatar_id', 'location', 'notification'],
      include: [
        {
          model: File,
          as: 'avatar',
        },
        {
          association: 'pets',
          include: [
            {
              model: File,
              as: 'avatar',
            },
          ],
        },
        {
          association: 'enderecos',
        },
        {
          association: 'credit_cards',
        },
      ],
    });
    return res.json(user);
  }

  async show(req, res) {
    const user = await User.findOne({
      where: { id: req.userId },
      attributes: ['id', 'email', 'name', 'avatar_id', 'telefone', 'location', 'notification'],
      include: [
        {
          model: File,
          as: 'avatar',
        },
        {
          association: 'pets',
          include: [
            {
              model: File,
              as: 'avatar',
            },
          ],
        },
        {
          association: 'enderecos',
        },
        {
          association: 'credit_cards',
        },
      ],
    });
    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Erro de validação' });
    }

    const userExist = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExist) {
      return res.status(401).json({ error: 'Email já cadastrado' });
    }

    const { id, email } = await User.create(req.body);

    return res.json({
      id,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      telefone: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      comfirmPassword: Yup.string().when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Erro de validação' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExist = await User.findOne({ where: { email } });
      if (userExist) {
        return res.status(401).json({ error: 'Email já cadastrado' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'As senhas não são iguais' });
    }

    if (req.body.avatar_id) {
      const file = await File.findByPk(req.body.avatar_id);
      if (!file) {
        return res.status(401).json({ error: 'Foto de perfil não encontrada' });
      }
    }

    const {
      id, name, telefone, avatar_id, location, notification,
    } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      telefone,
      avatar_id,
      location,
      notification,
    });
  }
}

module.exports = new UserController();
