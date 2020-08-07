const Yup = require('yup');
const CreditCard = require('../models/CreditCard');
const pagarme = require('pagarme')

class CreditCardController {
  async store(req, res) {
    const schema = Yup.object().shape({
      titular: Yup.string().required('titular obrigatório'),
      card_number: Yup.string().required('número do cartão obrigatório'),
      validade: Yup.string().required('validade obrigatório'),
      cvv: Yup.string().required('cvv obrigatório'),
      payment: Yup.string().required('metodo de pagamento obigatório'),

    });
    const { titular , card_number , validade , cvv, payment} = req.body

    pagarme.client.connect({ api_key: 'ak_test_X2rJRGqCaE4O97mh8xsYULpqxlT4RI' })
   .then(client => client.cards.create({
     card_number: card_number,
     card_holder_name: titular,
     card_expiration_date: validade,
     card_cvv: cvv,
   }))
  .then(async function(recipient){
    console.log(recipient)
    try {
      await schema.validate(req.body);

      const creditCard = await CreditCard.create({ ...req.body, user_id: req.userId });

      return res.json(creditCard);
    } catch (error) {
      return res.status(500).json(error);
    }
  })
  .catch(function(exp){
    console.log('error')
    try {
    
      return res.json(exp);
    } catch (error) {
      return res.status(500).json(error);
    }
  })
  

  
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
