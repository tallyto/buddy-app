const crypto = require('crypto');
const moment = require('moment');
const Provider = require('../models/Provider');

class ForgetPasswordProviderController {
  async store(req, res) {
    const { email } = req.body;

    const provider = await Provider.findOne({
      where: {
        email,
      },
    });

    if (!provider) {
      return res.status(401).json({
        error: 'This provider not exist',
      });
    }

    provider.token = crypto.randomBytes(10).toString('hex');

    provider.token_created_at = new Date();

    const { token } = await provider.save();

    /**
      await Queue.add(ForgetPassword.key, {
      provider: provider.name,
      token,
      email,
    });
    */

    return res.json(token);
  }

  async create(req, res) {
    const { token } = req.params;
    const { password } = req.body;
    const provider = await Provider.findOne({
      where: {
        token,
      },
    });

    if (!provider) {
      return res.status(401).json({ error: 'Token not exist' });
    }

    const tokenExpired = moment()
      .subtract('1', 'days')
      .isAfter(provider.token_created_at);

    if (tokenExpired) {
      return res.status(401).json({
        error: 'O token de recuperação extá expirado',
      });
    }

    provider.token = null;
    provider.token_created_at = null;
    provider.password = password;

    await provider.save();

    return res.json(provider);
  }
}

module.exports = new ForgetPasswordProviderController();
