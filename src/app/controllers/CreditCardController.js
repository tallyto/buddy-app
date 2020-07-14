const Yup = require('yup');
const CreditCard = require('../models/CreditCard');

class CreditCardController {

  async store(req, res) {
    const schema = Yup.object().shape({
      titular: Yup.string().required('titular obrigatório'),
      card_number: Yup.string().required('número do cartão obrigatório'),
      validade: Yup.string().required('validade obrigatório'),
      cvv: Yup.string().required('cvv obrigatório'),
      payment: Yup.string().required('metodo de pagamento obigatório'),

    });

    try {
      await schema.validate(req.body);

      const creditCard = await CreditCard.create({ ...req.body, user_id: req.userId });

      return res.json(creditCard);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    const creditCard = await CreditCard.findByPk(req.params.id);

    if (!creditCard) {
      return res.status(400).json({ error: 'cartão de credito não encontrado' });
    }

    await creditCard.update(req.body);

    return res.json(creditCard);
  }

  async delete(req, res) {
    const creditCard = await CreditCard.findByPk(req.params.id);

    if (!creditCard) {
      return res.status(400).json({ error: 'cartão de credito não encontrado' });
    }

    await creditCard.destroy();

    return res.json();
  }
}

module.exports = new CreditCardController();
