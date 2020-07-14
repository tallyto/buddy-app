const Yup = require('yup');
const ContaBancaria = require('../models/ContaBancaria');

class ContaBancariaController {
  
  async store(req, res) {
    const schema = Yup.object().shape({
      conta: Yup.string().required('conta obrigatória'),
      agencia: Yup.string().required('agencia obrigatória'),
      banco: Yup.string().required('banco obrigatório'),
    });

    try {
      await schema.validate(req.body);

      const conta = await ContaBancaria.create({
        ...req.body,
        provider_id: req.providerId,
      });

      return res.json(conta);
    } catch (error) {
      return res.status(500).json(error);
    }
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
