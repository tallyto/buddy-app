const Mail = require('../../lib/Mail');

class ForgetPassword {
  get key() {
    return 'ForgetPassword';
  }

  async handle({ data }) {
    const { user, email, token } = data;
    console.log('Enviando email de alteração de senha');
    await Mail.sendMail({
      to: `${user} <${email}>`,
      subject: 'Solicitação de alteração de senha',
      template: 'forget-password',
      context: { user, token },
    });
  }
}

module.exports = new ForgetPassword();
