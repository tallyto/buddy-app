/* eslint-disable consistent-return */
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Provider = require('../models/Provider');

class ForgerPasswordController {
  async user(req, res) {
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
      host: 'email-smtp.us-east-1.amazonaws.com',
      port: 25,
      auth: {
        user: 'AKIAVCHI6YVLGBG2GBOX',
        pass: 'BKhV+FjwqrEI3J+ICKFrAvuEutHMKjIYVkr3mv/9alvY',
      },
    });

    const newPassword = crypto.randomBytes(4).toString('hex');

    try {
      transporter
        .sendMail({
          from: 'Equipe Buddy <contatobuddyapp@gmail.com>',
          to: email,
          subject: 'Recuperação de senha!',
          html: `<p>Olá, sua nova senha para acesar o sistema é: ${newPassword}</p></br><a href="http://localhost:3333/login">Sistema</a>`,
        }).then(() => {
          user.update({ password: newPassword }).then(() => res.json({ message: 'Senha atualizada com sucesso!' })).catch((error) => {
            res.json({ message: 'Erro ao atualizar a senha', error });
          });
        }).catch((error) => res.json({ message: 'Erro ao enviar o email', error }));
    } catch (error) {
      return res.json({ message: 'Erro ao atualizar a senha', error });
    }
  }

  async provider(req, res) {
    const { email } = req.body;

    const provider = await Provider.findOne({
      where: {
        email,
      },
    });

    if (!provider) {
      return res.status(401).json({
        error: 'Usuário não existente',
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'email-smtp.us-east-1.amazonaws.com',
      port: 25,
      auth: {
        user: 'AKIAVCHI6YVLGBG2GBOX',
        pass: 'BKhV+FjwqrEI3J+ICKFrAvuEutHMKjIYVkr3mv/9alvY',
      },
    });

    const newPassword = crypto.randomBytes(4).toString('hex');

    try {
      transporter
        .sendMail({
          from: 'Equipe Buddy <contatobuddyapp@gmail.com>',
          to: email,
          subject: 'Recuperação de senha!',
          html: `<p>Olá, sua nova senha para acesar o sistema é: ${newPassword}</p>`,
        }).then(() => {
          provider.update({ password: newPassword }).then(() => res.json({ message: 'Senha atualizada com sucesso!' })).catch((error) => {
            res.json({ message: 'Erro ao atualizar a senha', error });
          });
        }).catch((error) => res.json({ message: 'Erro ao enviar o email', error }));
    } catch (error) {
      return res.json({ message: 'Erro ao atualizar a senha', error });
    }
  }
}

module.exports = new ForgerPasswordController();
