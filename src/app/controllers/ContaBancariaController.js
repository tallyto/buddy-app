const Yup = require('yup');
const ContaBancaria = require('../models/ContaBancaria');
const pagarme = require('pagarme')

class ContaBancariaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      conta: Yup.string().required('conta obrigatória'),
      agencia: Yup.string().required('agencia obrigatória'),
      banco: Yup.string().required('banco obrigatório'),
    });

    const { agencia , banco , conta , cpf, code} = req.body
    pagarme.client.connect({ api_key: 'ak_test_X2rJRGqCaE4O97mh8xsYULpqxlT4RI' })
    .then(client => client.bankAccounts.create({
      bank_code: code,
      agencia: agencia,
      conta: conta,
      conta_dv: '9',
      legal_name: banco,
      document_number: cpf
    }))
    .then(bankAccount => pagarme.client.connect({ api_key: 'ak_test_X2rJRGqCaE4O97mh8xsYULpqxlT4RI' })
    .then(client => client.recipients.create({
      bank_account_id: bankAccount.id,
      transfer_interval: 'weekly',
      transfer_day: 5,
      transfer_enabled: true
    }))
    .then(async function(recipient){
      console.log(recipient)
      try {
        await schema.validate(req.body);
        const conta = await ContaBancaria.create({
          ...req.body,
          recipient_id: recipient.id,
          provider_id: req.providerId,
          
        });
  
        return res.json(conta);
      } catch (error) {
        return res.status(500).json(error);
      }
    }))
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
    const conta = await ContaBancaria.findByPk(req.params.id);
    if (!conta) {
      return res.status(400).json({ error: 'conta não encontrada' });
    }

    if (conta.provider_id !== req.providerId) {
      return res.status(401).json({ error: 'operação não autorizada' });
    }

    await conta.update(req.body);

    return res.json(conta);
  }

  async destroy(req, res) {
    const conta = await ContaBancaria.findByPk(req.params.id);
    if (!conta) {
      return res.status(400).json({ error: 'conta não encontrada' });
    }

    if (conta.provider_id !== req.providerId) {
      return res.status(401).json({ error: 'operação não autorizada' });
    }

    await conta.destroy();

    return res.json();
  }
}

module.exports = new ContaBancariaController();
