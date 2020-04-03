/* eslint-disable camelcase */
const Yup = require('yup');
const Provider = require('../models/Provider');
const File = require('../models/File');
const Categoria = require('../models/Categoria');

class ProviderController {
  async index(req, res) {
    const provider = await Provider.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'endereco',
        'telefone',
        'bio',
        'cpf',
        'passeador',
        'adestrador',
        'clinica',
        'avatar_id',
        'categoria_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'name', 'url'],
        },
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['name'],
        },
      ],
    });

    return res.json(provider);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const providerExist = await Provider.findOne({
      where: { email: req.body.email },
    });

    if (providerExist) {
      return res.status(400).json({ error: 'Provider already exists.' });
    }

    const { id, email } = await Provider.create(req.body);

    return res.json({
      id,
      email,
    });
  }

  async cadastro(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      telefone: Yup.string(),
      endereco: Yup.string(),
      cpf: Yup.string(),
      bio: Yup.string(),
      clinica: Yup.boolean(),
      adestrador: Yup.boolean(),
      passeador: Yup.boolean(),
      nascimento: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const provider = await Provider.findByPk(req.params.id);

    const {
      id,
      name,
      endereco,
      email,
      telefone,
      cpf,
      bio,
      clinica,
      adestrador,
      passeador,
      nascimento,
    } = await provider.update(req.body);

    return res.json({
      id,
      name,
      email,
      endereco,
      telefone,
      cpf,
      bio,
      clinica,
      adestrador,
      passeador,
      nascimento,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      telefone: Yup.string(),
      endereco: Yup.string(),
      cpf: Yup.string(),
      bio: Yup.string(),
      nascimento: Yup.date(),
      clinica: Yup.boolean(),
      adestrador: Yup.boolean(),
      passeador: Yup.boolean(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      comfirmPassword: Yup.string().when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const provider = await Provider.findByPk(req.providerId);

    if (email !== provider.email) {
      const providerExist = await Provider.findOne({ where: { email } });
      if (providerExist) {
        return res.status(400).json({ error: 'Provider already exists.' });
      }
    }

    if (oldPassword && !(await provider.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id,
      name,
      endereco,
      telefone,
      cpf,
      bio,
      nascimento,
      clinica,
      adestrador,
      passeador,
      categoria_id,
      avatar_id,
    } = await provider.update(req.body);

    return res.json({
      id,
      name,
      email,
      endereco,
      telefone,
      cpf,
      bio,
      nascimento,
      clinica,
      adestrador,
      passeador,
      categoria_id,
      avatar_id,
    });
  }
}

module.exports = new ProviderController();
