const Avaliacao = require('../models/Avaliacao');

class AvaliacaoController {
  async createAvaliacao(req, res) {
    const avaliacao = await Avaliacao.create({
      ...req.body,
      user_id: req.userId,
      provider_id: req.params.provider_id,
    });

    return res.json(avaliacao);
  }

  async getAvalicao(req, res) {
    const avaliacoes = await Avaliacao.findAll();
    return res.json(avaliacoes);
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
