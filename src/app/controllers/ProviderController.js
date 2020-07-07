const Yup = require('yup');
const Provider = require('../models/Provider');
const File = require('../models/File');

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
        'clinica',
        'crmv',
        'location',
        'notification',
        'avatar_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
        },
        {
          model: File,
          as: 'crmv_file',
        },
        {
          association: 'enderecos',
        },
        { association: 'contas' },
      ],
    });

    return res.json(provider);
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
        'location',
        'notification',
        'avatar_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
        },
        {
          model: File,
          as: 'crmv_file',
        },
        {
          association: 'enderecos',
        },
        { association: 'contas' },
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
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const providerExist = await Provider.findOne({
      where: { email: req.body.email },
    });

    if (providerExist) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const { id, email } = await Provider.create(req.body);

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
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const { email, oldPassword, avatar_id } = req.body;

    if (!avatar_id) {
      const avatar = await File.findByPk(avatar_id);
      if (!avatar) {
        return res.status(401).json({ error: 'Foto de perfil não encontrada' });
      }
    }

    if (email && email !== provider.email) {
      const providerExist = await Provider.findOne({ where: { email } });
      if (providerExist) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
    }

    if (oldPassword && !(await provider.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'As senha não são iguais' });
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
      location,
      notification,
      crmv_file,
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
      location,
      notification,
      avatar_id,
      crmv_file,
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
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const { email, oldPassword } = req.body;

    const provider = await Provider.findByPk(req.params.id);

    if (!provider) {
      return res
        .status(401)
        .json({ error: 'Você não pode cadastar um usuario que não existe' });
    }

    // Verifica se o avatar é valido
    if (req.body.avatar_id) {
      const file = await File.findByPk(req.body.avatar_id);
      if (!file) {
        return res.status(400).json({ error: 'Foto de perfil não encontrada' });
      }
    }

    if (email && email !== provider.email) {
      const providerExist = await Provider.findOne({ where: { email } });
      if (providerExist) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
    }

    if (oldPassword && !(await provider.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'As senhas não são iguais' });
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
      location,
      notification,
      avatar_id,
      crmv_file,
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
      location,
      notification,
      avatar_id,
      crmv_file,
    });
  }
}

module.exports = new ProviderController();
