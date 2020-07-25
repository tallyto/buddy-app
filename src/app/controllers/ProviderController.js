const Yup = require('yup');
const Provider = require('../models/Provider');
const File = require('../models/File');

class ProviderController {
  async show(req, res) {
    const provider = await Provider.findOne({
      where: { id: req.providerId },
      include: [
        {
          model: File,
          as: 'avatar',
        },
        {
          model: File,
          as: 'crmv_frente',
        },
        {
          model: File,
          as: 'crmv_verso',
        },
        {
          association: 'enderecos',
        },
        { association: 'contas' },
        { association: 'especialidades' },
      ],
    });

    provider.password_hash = null;

    return res.json(provider);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('e-mail inválido')
        .required('e-mail obrigatório'),
      password: Yup.string()
        .min(6, 'senha menor que 6 caracteres')
        .required('senha obrigatória'),
    });

    try {
      await schema.validate(req.body);

      const providerExist = await Provider.findOne({
        where: { email: req.body.email },
      });

      if (providerExist) {
        return res.status(400).json({ error: 'e-mail já cadastrado' });
      }

      const { id, email } = await Provider.create(req.body);

      return res.json({
        id,
        email,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email('e-mail inválido'),
      password: Yup.string().min(6, 'senha menor que 6 caracteres'),
      comfirmPassword: Yup.string().when('password', (password, field) => (password
        ? field
          .required('senha de confirmação requerida')
          .oneOf([Yup.ref('password')], 'as senhas não são iguais')
        : field)),
    });

    try {
      await schema.validate(req.body);

      const {
        email, avatar_id, crmv_frente_id, crmv_verso_id,
      } = req.body;

      if (avatar_id) {
        const avatar = await File.findByPk(avatar_id);
        if (!avatar) {
          return res.status(401).json({ error: 'foto não encontrada' });
        }
      }

      if (crmv_frente_id) {
        const crmv = await File.findByPk(crmv_frente_id);
        if (!crmv) {
          return res.status(401).json({ error: 'crmv não encontrado' });
        }
      }

      if (crmv_verso_id) {
        const crmv = await File.findByPk(crmv_verso_id);
        if (!crmv) {
          return res.status(401).json({ error: 'crmv não encontrado' });
        }
      }

      const provider = await Provider.findByPk(req.providerId);

      if (email && email !== provider.email) {
        const providerExist = await Provider.findOne({ where: { email } });
        if (providerExist) {
          return res.status(400).json({ error: 'e-mail já cadastrado' });
        }
      }

      await provider.update(req.body);

      provider.password_hash = null;

      return res.json(provider);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async cadastro(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email('e-mail inválido'),
      password: Yup.string().min(6, 'senha menor que 6 caracteres'),
      comfirmPassword: Yup.string().when('password', (password, field) => (password
        ? field
          .required('senha de confirmação requerida')
          .oneOf([Yup.ref('password')], 'as senhas não são iguais')
        : field)),
    });

    const { email, avatar_id } = req.body;

    try {
      await schema.validate(req.body);
      const provider = await Provider.findByPk(req.params.id);

      if (avatar_id) {
        const avatar = await File.findByPk(avatar_id);
        if (!avatar) {
          return res.status(401).json({ error: 'foto não encontrada' });
        }
      }

      if (crmv_frente_id) {
        const crmv = await File.findByPk(crmv_frente_id);
        if (!crmv) {
          return res.status(401).json({ error: 'crmv não encontrado' });
        }
      }

      if (crmv_verso_id) {
        const crmv = await File.findByPk(crmv_verso_id);
        if (!crmv) {
          return res.status(401).json({ error: 'crmv não encontrado' });
        }
      }

      if (email && email !== provider.email) {
        const providerExist = await Provider.findOne({ where: { email } });
        if (providerExist) {
          return res.status(400).json({ error: 'e-mail já cadastrado' });
        }
      }

      await provider.update(req.body);
      provider.password_hash = null;
      return res.json(provider);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new ProviderController();
