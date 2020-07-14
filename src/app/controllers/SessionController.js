const jwt = require('jsonwebtoken');
const Yup = require('yup');
const User = require('../models/User');
const Provider = require('../models/Provider');
const Admin = require('../models/Admin');


const authConfig = require('../../config/auth');

class SessionController {
  async user(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('e-mail inválido')
        .required('e-mail obrigatório'),
      password: Yup.string().min(6, 'senha menor que 6 caracteres').required('senha obrigatória'),
    });

    try {
      await schema.validate(req.body);
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'e-mail ou senha incorreto' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'e-mail ou senha incorreto' });
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
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async provider(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('e-mail inválido')
        .required('e-mail obrigatório'),
      password: Yup.string().min(6, 'senha menor que 6 caracteres').required('senha obrigatória'),
    });

    try {
      await schema.validate(req.body);
      const { email, password } = req.body;

      const provider = await Provider.findOne({ where: { email } });

      if (!provider) {
        return res.status(401).json({ error: 'e-mail ou senha icorreto' });
      }

      if (!(await provider.checkPassword(password))) {
        return res.status(401).json({ error: 'e-mail ou senha icorreto' });
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
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async admin(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('e-mail inválido')
        .required('e-mail obrigatório'),
      password: Yup.string().min(6, 'senha menor que 6 caracteres').required('senha obrigatória'),
    });

    try {
      await schema.validate(req.body);
      const { email, password } = req.body;

      const admin = await Admin.findOne({ where: { email } });

      if (!admin) {
        return res.status(401).json({ error: 'e-mail ou senha icorreto' });
      }

      if (!(await admin.checkPassword(password))) {
        return res.status(401).json({ error: 'e-mail ou senha icorreto' });
      }

      const { id } = admin;

      return res.json({
        admin: {
          id,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  }
}

module.exports = new SessionController();
