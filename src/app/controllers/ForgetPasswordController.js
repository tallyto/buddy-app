const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

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
        error: 'Usuário não existente!',
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'AKIAVCHI6YVLMS5DAANS',
        pass: 'BCp62DLytiGcd8UA7+wg6Vgq81zJUZ8I/DGTMkAF+xrh',
      },
    });

    const newPassword = crypto.randomBytes(4).toString('hex');

    await user.update({ password: newPassword });

    transporter
      .sendMail({
        from: 'Equipe Buddy <noreply@buddy.com>',
        to: email,
        subject: 'Recuperação de senha!',
        html: `<p>Olá, sua nova senha para acesar o sistema é: ${newPassword}</p></br><a href="http://localhost:3333/login">Sistema</a>`,
      });

    return res.json({ message: 'Senha atualizada com sucesso!' });
  }
}

module.exports = new ForgetPasswordController();
