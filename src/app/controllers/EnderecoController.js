const Yup = require('yup');
const Endereco = require('../models/Endereco');
const User = require('../models/User');
const Provider = require('../models/Provider');

class EnderecoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      rua: Yup.string().required('rua é um campo obrigatório'),
      numero: Yup.string().required('numero é um campo obrigatório'),
      complemento: Yup.string().required('complemento é um campo obrigatório'),
      bairro: Yup.string().required('bairro é um campo obrigatório'),
      cidade: Yup.string().required('cidade é um campo obrigatório'),
      estado: Yup.string().required('estado é um campo obrigatório'),
      user_id: Yup.number(),
      provider_id: Yup.number(),
    });
    const { user_id, provider_id } = req.body;
    if (!user_id && !provider_id) {
      return res
        .status(401)
        .json({ error: 'você deve informar a quem pertence esse endereço' });
    }
    try {
      await schema.validate(req.body);

      if (user_id) {
        const user = await User.findByPk(user_id);
        if (!user) {
          return res.status(401).json({ error: 'usuário não encontrado' });
        }
      }

      if (provider_id) {
        const provider = await Provider.findByPk(provider_id);
        if (!provider) {
          return res.status(401).json({ error: 'profissional não encontrado' });
        }
      }

      const endereco = await Endereco.create(req.body);

      return res.json(endereco);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    const endereco = await Endereco.findByPk(req.params.id);

    if (!endereco) {
      return res.status(400).json({ error: 'endereço não encontrado' });
    }

    await endereco.update(req.body);

    return res.json(endereco);
  }

  async delete(req, res) {
    const endereco = await Endereco.findByPk(req.params.id);

    if (!endereco) {
      return res.status(400).json({ error: 'endereço não encontrado' });
    }

    await endereco.destroy();

    return res.json();
  }
}

module.exports = new EnderecoController();
