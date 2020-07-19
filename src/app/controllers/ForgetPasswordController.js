/* eslint-disable consistent-return */
const crypto = require('crypto');
const User = require('../models/User');
const Provider = require('../models/Provider');
const AWS = require('aws-sdk')
const ses = new AWS.SES(
  {
    accessKeyId: "AKIAVCHI6YVLMMVSHFWC",
    secretAccessKey: "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",
    region: "us-east-1"
  }
)

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
        error: 'usuário não encontrado',
      });
    }

    const newPassword = crypto.randomBytes(4).toString('hex');

    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data:
              `<p>Olá, sua nova senha para acesar o sistema é: ${newPassword}</p></br>
            <p>Equipe buddy agradece!</p>`
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Recuperação de senha!'
        }
      },
      ReturnPath: 'contatobuddyapp@gmail.com',
      Source: 'contatobuddyapp@gmail.com'
    }

    ses.sendEmail(params,async (err, data) => {
      if (err) {
        return res.json({ message: 'erro ao atualizar sua senha', err });
      }
      else {
       await user.update({ password: newPassword })

        return res.json({ message: 'senha atualizada com sucesso' })
      }
    })


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

    const newPassword = crypto.randomBytes(4).toString('hex');

    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data:
              `<p>Olá, sua nova senha para acesar o sistema é: ${newPassword}</p></br>
            <p>Equipe buddy agradece!</p>`
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Recuperação de senha!'
        }
      },
      ReturnPath: 'contatobuddyapp@gmail.com',
      Source: 'contatobuddyapp@gmail.com'
    }

    ses.sendEmail(params,async (err, data) => {
      if (err) {
        return res.json({ message: 'erro ao atualizar sua senha', err });
      }
      else {
       await provider.update({ password: newPassword })

        return res.json({ message: 'senha atualizada com sucesso' })
      }
    })

  }
}

module.exports = new ForgerPasswordController();
