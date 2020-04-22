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
        'telefone',
        'bio',
        'cpf',
        'nascimento',
        'passeador',
        'adestrador',
        'crmv',
        'clinica',
        'avatar_id',
        'categoria_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'url'],
        },
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['name'],
        },
        {
          association: 'enderecos',
          attributes: [
            'id',
            'rua',
            'complemento',
            'cep',
            'bairro',
            'cidade',
            'user_id',
            'provider_id',
          ],
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


  async show(req, res) {
    const provider = await Provider.findOne({
      where: { id: req.providerId },
      attributes: [
        'id',
        'name',
        'email',
        'telefone',
        'bio',
        'cpf',
        'crmv',
        'nascimento',
        'passeador',
        'clinica',
        'adestrador',
        'avatar_id',
        'categoria_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'url'],
        },
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['name'],
        },
        {
          association: 'enderecos',
          attributes: [
            'id',
            'rua',
            'complemento',
            'cep',
            'bairro',
            'cidade',
            'user_id',
            'provider_id',
          ],
        },
      ],
    });

    return res.json(provider);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      telefone: Yup.string(),
      cpf: Yup.string(),
      bio: Yup.string(),
      nascimento: Yup.date(),
      clinica: Yup.boolean(),
      adestrador: Yup.boolean(),
      passeador: Yup.boolean(),
      crmv: Yup.string(),
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

    if (req.body.avatar_id) {
      const file = await File.findByPk(req.body.avatar_id);
      if (!file) {
        return res.status(400).json({ error: 'Avatar not exist' });
      }
    }

    if (req.body.categoria_id) {
      const categoria = await Categoria.findByPk(req.body.categoria_id);
      if (!categoria) {
        return res.status(400).json({ error: 'Categoria not exist' });
      }
    }

    const {
      id,
      name,
      telefone,
      cpf,
      bio,
      nascimento,
      clinica,
      adestrador,
      passeador,
      crmv,
      categoria_id,
      avatar_id,
    } = await provider.update(req.body);

    return res.json({
      id,
      name,
      email,
      telefone,
      cpf,
      bio,
      nascimento,
      clinica,
      adestrador,
      passeador,
      crmv,
      categoria_id,
      avatar_id,
    });
  }

  async cadastro(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      telefone: Yup.string(),
      cpf: Yup.string(),
      bio: Yup.string(),
      nascimento: Yup.date(),
      clinica: Yup.boolean(),
      adestrador: Yup.boolean(),
      passeador: Yup.boolean(),
      crmv: Yup.string(),
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

    const provider = await Provider.findByPk(req.params.id);

    if (email !== provider.email) {
      const providerExist = await Provider.findOne({ where: { email } });
      if (providerExist) {
        return res.status(400).json({ error: 'Provider already exists.' });
      }
    }

    if (oldPassword && !(await provider.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    if (req.body.avatar_id) {
      const file = await File.findByPk(req.body.avatar_id);
      if (!file) {
        return res.status(400).json({ error: 'Avatar not exist' });
      }
    }

    if (req.body.categoria_id) {
      const categoria = await Categoria.findByPk(req.body.categoria_id);
      if (!categoria) {
        return res.status(400).json({ error: 'Categoria not exist' });
      }
    }

    const {
      id,
      name,
      telefone,
      cpf,
      bio,
      nascimento,
      clinica,
      adestrador,
      passeador,
      crmv,
      categoria_id,
      avatar_id,
    } = await provider.update(req.body);

    return res.json({
      id,
      name,
      email,
      telefone,
      cpf,
      bio,
      nascimento,
      clinica,
      adestrador,
      passeador,
      crmv,
      categoria_id,
      avatar_id,
    });
  }
}

module.exports = new ProviderController();
