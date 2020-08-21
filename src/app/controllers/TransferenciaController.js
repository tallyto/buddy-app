const Yup = require('yup');
const pagarme = require('pagarme')
const ContaBancaria = require('../models/ContaBancaria');

class TransferenciaController {
  async store(req, res) {

    const {  bankId , valor } = req.body
    
      const contaBancaria = await ContaBancaria.findOne({
        where: { id: bankId },
      });
    pagarme.client.connect({ api_key: 'ak_live_R7gax2DaMemgk2QlU6JNCzQ8VhPNpf' })
    .then(client => client.transfers.create({
        amount: valor,
        recipient_id: contaBancaria.recipient_id,
    }))
   .then(function(transfer){
    console.log('transfer')
    try {
      return res.json(transfer);
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

}

module.exports = new TransferenciaController();
