const Mail = require('../../lib/Mail');

class ForgetPassword {
  get key() {
    return 'ForgetPassword';
  }

  async handle({ data }) {
    const { user, email } = data;
    console.log('A fila executou');
    await Mail.sendMail({
      to: `${user} <${email}>`,
      subject: 'Solicitação de alteração de senha',
      template: 'forget-password',
      context: { user },
    });
  }
}

module.exports = new ForgetPassword();
