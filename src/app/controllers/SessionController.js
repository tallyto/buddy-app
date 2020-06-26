const jwt = require('jsonwebtoken');
const Yup = require('yup');
const User = require('../models/User');
const Provider = require('../models/Provider');

const authConfig = require('../../config/auth');

class SessionController {
  async user(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Email não cadastrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id } = user;

    return res.json({
      user: {
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async provider(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }
    const { email, password } = req.body;

    const provider = await Provider.findOne({ where: { email } });

    if (!provider) {
      return res.status(401).json({ error: 'Email não cadastrado' });
    }

    if (!(await provider.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id } = provider;

    return res.json({
      provider: {
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
