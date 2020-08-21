/* eslint-disable no-return-assign */
const Avaliacao = require('../models/Avaliacao');
const Provider = require('../models/Provider');

class AvaliacaoController {
  async createAvaliacao(req, res) {
    const { provider_id } = req.params;
    const avaliacao = await Avaliacao.create({
      ...req.body,
      user_id: req.userId,
      provider_id,
    });

    const avaliacoes = await Avaliacao.findAll({ where: { provider_id } });
    let total = 0;
    avaliacoes.forEach((item) => total += Number(item.avaliacao));
    const provider = await Provider.findByPk(provider_id);
    provider.avaliacao = total / avaliacoes.length;
    await provider.save();
    return res.json(avaliacao);
  }

  async getAvaliacaoForProvider(req, res) {
    const avaliacoes = await Avaliacao.findAll({
      where: {
        provider_id: req.params.provider_id,
      },
    });

    return res.json(avaliacoes);
  }
}

module.exports = new AvaliacaoController();
