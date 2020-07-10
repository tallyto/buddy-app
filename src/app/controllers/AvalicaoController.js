const Avaliacoes = require('../models/Avaliacao');

class AvaliacaoController {
  async createAvaliacao(req, res) {
    console.log({
      ...req.body,
      user_id: req.userId,
      provider_id: req.params.provider_id,

    });

    const avaliacoes = await Avaliacoes.create({
      ...req.body,
      user_id: req.userId,
      provider_id: req.params.provider_id,
    });

    return res.json(avaliacoes);
  }
}

module.exports = new AvaliacaoController();
