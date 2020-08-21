const Yup = require('yup');
const pagarme = require('pagarme')
const ContaBancaria = require('../models/ContaBancaria');
const CreditCard = require('../models/CreditCard');
const User = require('../models/User');
const Endereco = require('../models/Endereco');



class TransacaoController {
  async store(req, res) {

    const { creditID , bankId , userId, valor , split1 , split2 , parcelas, description, idAgendamento} = req.body
    const creditCard = await CreditCard.findOne({
        where: { id: creditID },
      });
      const contaBancaria = await ContaBancaria.findOne({
        where: { id: bankId },
      });
      const user = await User.findOne({
        where: { id: userId },
      });
      const endereco = await Endereco.findOne({
        where: { id: creditCard.endereco_id },
      });
    pagarme.client.connect({ api_key: 'ak_live_R7gax2DaMemgk2QlU6JNCzQ8VhPNpf' })
  .then(client => client.transactions.create({
    "amount": valor,
    "card_id":creditCard.card_id,
    "installments":parcelas,
    "soft_descriptor":description,
    "customer": {
      "external_id": `#${user.id}`,
      "name":user.name,
      "type": "individual",
      "country": "br",
      "email": user.email,
      "documents": [
        {
          "type": "cpf",
          "number": creditCard.cpf
        }
      ],
      "phone_numbers": [`+55${user.telefone}`],
    },
    "billing": {
      "name": creditCard.titular,
      "address": {
        "country": "br",
        "state": "rj",
        "city": endereco.cidade,
        "neighborhood":endereco.bairro,
        "street": endereco.rua,
        "street_number": endereco.numero,
        "zipcode": endereco.cep
      }
    },
    "items": [
      {
        "id": idAgendamento,
        "title": description,
        "unit_price": valor,
        "quantity": 1,
        "tangible": false
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
          "recipient_id": "re_cke4l0k020r7b6y60jerq116j",
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
