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

    const { agencia  , conta , conta_dv , cpf , code , nome} = req.body
    pagarme.client.connect({ api_key: 'ak_live_R7gax2DaMemgk2QlU6JNCzQ8VhPNpf' })
    .then(client => client.bankAccounts.create({
      bank_code: code,
      agencia: agencia,
      conta: conta,
      conta_dv: conta_dv,
      legal_name: nome,
      document_number: cpf
    }))
    .then(bankAccount => pagarme.client.connect({ api_key: 'ak_live_R7gax2DaMemgk2QlU6JNCzQ8VhPNpf' })
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
      console.log(exp)
      try {
      
       return res.status(401).json(exp);
        
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
