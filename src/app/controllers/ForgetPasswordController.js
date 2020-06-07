const crypto = require('crypto');
const moment = require('moment');
const User = require('../models/User');
const Queue = require('../../lib/Queue');
const ForgetPassword = require('../Jobs/ForgetPassword');

class ForgetPasswordController {
  async store(req, res) {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: 'This user not exist',
      });
    }

    user.token = crypto.randomBytes(10).toString('hex');

    user.token_created_at = new Date();

    const { token } = await user.save();

    /**
      await Queue.add(ForgetPassword.key, {
      user: user.name,
      token,
      email,
    });
    */

    return res.json(token);
  }

  async create(req, res) {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      where: {
        token,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Token not exist' });
    }

    const tokenExpired = moment()
      .subtract('1', 'days')
      .isAfter(user.token_created_at);

    if (tokenExpired) {
      return res.status(401).json({
        error: 'O token de recuperação extá expirado',
      });
    }

    user.token = null;
    user.token_created_at = null;
    user.password = password;

    await user.save();

    return res.json(user);
  }
}

module.exports = new ForgetPasswordController();
