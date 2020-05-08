/* eslint-disable camelcase */
const Yup = require('yup');
const Endereco = require('../models/Endereco');
const User = require('../models/User');
const Provider = require('../models/Provider');

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
      estado: Yup.string().required(),
      user_id: Yup.number(),
      provider_id: Yup.number(),
    });
    const { user_id, provider_id } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(401).json({ error: 'Não é possivel associar um endereço a um usuario que não exista' });
      }
    }

    if (provider_id) {
      const provider = await Provider.findByPk(provider_id);
      if (!provider) {
        return res.status(401).json({ error: 'Não é possivel associar um endereço a um provider que não exista' });
      }
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
      estado: Yup.string(),
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
