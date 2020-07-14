const Yup = require('yup');
const User = require('../models/User');
const File = require('../models/File');

class UserController {
   async show(req, res) {
    const user = await User.findOne({
      where: { id: req.userId },
      attributes: [
        'id',
        'email',
        'name',
        'avatar_id',
        'telefone',
        'location',
        'notification',
        'boletim_informativo',
      ],
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
        .email('e-mail inválido')
        .required('e-mail obrigatório'),
      password: Yup.string()
        .required('senha obrigatória')
        .min(6, 'senha menor que 6 caracteres'),
    });

    try {
      await schema.validate(req.body);

      const userExist = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExist) {
        return res.status(401).json({ error: 'e-mail já cadastrado' });
      }

      const { id, email } = await User.create(req.body);

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

      const { email, avatar_id } = req.body;

      const user = await User.findByPk(req.userId);

      if (email && email !== user.email) {
        const userExist = await User.findOne({ where: { email } });
        if (userExist) {
          return res.status(401).json({ error: 'e-mail já cadastrado' });
        }
      }

      if (avatar_id) {
        const file = await File.findByPk(avatar_id);
        if (!file) {
          return res
            .status(401)
            .json({ error: 'foto de perfil não encontrada' });
        }
      }

      const {
        id,
        name,
        telefone,
        location,
        notification,
        boletim_informativo,
      } = await user.update(req.body);

      return res.json({
        id,
        name,
        email,
        telefone,
        avatar_id,
        location,
        notification,
        boletim_informativo,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new UserController();
