const jwt = require('jsonwebtoken');
const Yup = require('yup');
const Provider = require('../models/Provider');
const authConfig = require('../../config/auth');

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, password } = req.body;

    const provider = await Provider.findOne({ where: { email } });

    if (!provider) {
      return res.status(401).json({ error: 'Provider not found' });
    }

    if (!(await provider.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
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
