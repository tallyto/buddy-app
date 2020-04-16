/* eslint-disable camelcase */
const Yup = require('yup');
const Endereco = require('../models/Endereco');

class EnderecoController {
  async index(req, res) {
    const endereco = await Endereco.findAll();

    return res.json(endereco);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string().required(),
      bairro: Yup.string().required(),
      cidade: Yup.string().required(),
      user_id: Yup.number(),
      provider_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const endereco = await Endereco.create(req.body);

    return res.json(endereco);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      rua: Yup.string(),
      numero: Yup.string(),
      complemento: Yup.string(),
      bairro: Yup.string(),
      cidade: Yup.string(),
      user_id: Yup.number(),
      provider_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const endereco = await Endereco.findByPk(req.params.id);

    if (!endereco) {
      return res.status(400).json({ error: 'Address not exist' });
    }

    await endereco.update(req.body);

    return res.json(endereco);
  }

  async delete(req, res) {
    const endereco = await Endereco.findByPk(req.params.id);

    if (!endereco) {
      return res.status(400).json({ error: 'Address not exist' });
    }

    await endereco.destroy();

    return res.json();
  }
}

module.exports = new EnderecoController();
