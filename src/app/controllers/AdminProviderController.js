const Provider = require('../models/Provider');

class AdminProviderController {
  async getPendingProvider(req, res) {
    const response = await Provider.findAll({
      where: {
        accept: null,
      },
    });
    response.forEach((provider) => { provider.password_hash = null; });
    return res.json(response);
  }

  async approveProvider(req, res) {
    const provider = await Provider.findByPk(req.params.provider_id);

    await provider.update({ accept: true });

    return res.json({ message: 'profissional aprovado!' });
  }
}

module.exports = new AdminProviderController();
