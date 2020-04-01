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

    await Queue.add(ForgetPassword.key, {
      user: user.name,
      email,
    });

    return res.json(user);
  }
}


module.exports = new ForgetPasswordController();
