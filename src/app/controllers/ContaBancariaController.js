const Yup = require('yup');
const ContaBancaria = require('../models/ContaBancaria');

class ContaBancariaController {
  async index(req, res) {
    const conta = await ContaBancaria.findAll();

    return res.json(conta);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      conta: Yup.string().required(),
      agencia: Yup.string().required(),
      banco: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const conta = await ContaBancaria.create({
      ...req.body,
      provider_id: req.providerId,
    });

    return res.json(conta);
  }

  async update(req, res) {
    const conta = await ContaBancaria.findByPk(req.params.id);
    if (!conta) {
      return res
        .status(401)
        .json({ error: 'Você não pode atualizar uma conta que não existe' });
    }

    if (conta.provider_id !== req.providerId) {
      return res.status(401).json({ error: 'Você não pode atulizar uma conta que não é sua' });
    }

    await conta.update(req.body);

    return res.json(conta);
  }

  async destroy(req, res) {
    const conta = await ContaBancaria.findByPk(req.params.id);
    if (!conta) {
      return res.status(401).json({ error: 'Você não pode remover uma conta que não existe' });
    }
    if (conta.provider_id !== req.providerId) {
      return res.status(401).json({ error: 'Você não pode remover uma conta que não lhe pertence' });
    }

    await conta.destroy();

    return res.json();
  }
}

module.exports = new ContaBancariaController();
