/* eslint-disable camelcase */
const Yup = require('yup');
const CreditCard = require('../models/CreditCard');

class CreditCardController {
  async index(req, res) {
    const creditCard = await CreditCard.findAll();

    return res.json(creditCard);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      titular: Yup.string().required(),
      card_number: Yup.string().required(),
      validade: Yup.string().required(),
      cvv: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const creditCard = await CreditCard.create({ ...req.body, user_id: req.userId });

    return res.json(creditCard);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      titular: Yup.string(),
      card_number: Yup.string(),
      validade: Yup.string(),
      cvv: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const creditCard = await CreditCard.findByPk(req.params.id);

    if (!creditCard) {
      return res.status(400).json({ error: 'Credit card not exist' });
    }

    await creditCard.update(req.body);

    return res.json(creditCard);
  }

  async delete(req, res) {
    const creditCard = await CreditCard.findByPk(req.params.id);

    if (!creditCard) {
      return res.status(400).json({ error: 'Credit card not exist' });
    }

    await creditCard.destroy();

    return res.json();
  }
}

module.exports = new CreditCardController();
