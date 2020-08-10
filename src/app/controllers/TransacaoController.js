const Yup = require('yup');
const pagarme = require('pagarme')
const ContaBancaria = require('../models/ContaBancaria');
const CreditCard = require('../models/CreditCard');

class TransacaoController {
  async store(req, res) {

    const { creditID , bankId , valor , split1 , split2 } = req.body
    const creditCard = await CreditCard.findOne({
        where: { id: creditID },
      });
      const contaBancaria = await ContaBancaria.findOne({
        where: { id: bankId },
      });
    pagarme.client.connect({ api_key: 'ak_test_X2rJRGqCaE4O97mh8xsYULpqxlT4RI' })
  .then(client => client.transactions.create({
    "amount": valor,
    "card_id":creditCard.card_id,
    // "card_number": creditCard.card_number,
    // "card_cvv": creditCard.cvv,
    // "card_expiration_date": creditCard.validate,
    // "card_holder_name": creditCard.titular,
    "customer": {
      "external_id": "#3311",
      "name": "Morpheus Fishburne",
      "type": "individual",
      "country": "br",
      "email": "mopheus@nabucodonozor.com",
      "documents": [
        {
          "type": "cpf",
          "number": "30621143049"
        }
      ],
      "phone_numbers": ["+5511999998888", "+5511888889999"],
      "birthday": "1965-01-01"
    },
    "billing": {
      "name": "Trinity Moss",
      "address": {
        "country": "br",
        "state": "sp",
        "city": "Cotia",
        "neighborhood": "Rio Cotia",
        "street": "Rua Matrix",
        "street_number": "9999",
        "zipcode": "06714360"
      }
    },
    "shipping": {
      "name": "Neo Reeves",
      "fee": 1000,
      "delivery_date": "2000-12-21",
      "expedited": true,
      "address": {
        "country": "br",
        "state": "sp",
        "city": "Cotia",
        "neighborhood": "Rio Cotia",
        "street": "Rua Matrix",
        "street_number": "9999",
        "zipcode": "06714360"
      }
    },
    "items": [
      {
        "id": "r123",
        "title": "Red pill",
        "unit_price": 10000,
        "quantity": 1,
        "tangible": true
      },
      {
        "id": "b123",
        "title": "Blue pill",
        "unit_price": 10000,
        "quantity": 1,
        "tangible": true
      }
    ],
    "split_rules": [
        {
          "recipient_id": contaBancaria.recipient_id,
          "percentage": split1,
          "liable": true,
          "charge_processing_fee": true
        },
        {
          "recipient_id": "re_ckdjc8oue02x26c6eiyaskhil",
          "percentage": split2,
          "liable": true,
          "charge_processing_fee": true
        }
      ]
    
  })).then(function(transaction){
    console.log('transaction')
    try {
    
      return res.json(transaction);
    } catch (error) {
      return res.status(500).json(error);
    }
  })  
  .catch(function(exp){
    console.log(exp)
    try {
    
      return res.json(exp);
    } catch (error) {
      return res.status(500).json(error);
    }
  })
   
  }

}

module.exports = new TransacaoController();
