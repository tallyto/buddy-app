const Provider = require('../models/Provider');
const File = require('../models/File');

class AdminProviderController {
  async getPendingProvider(req, res) {
    const response = await Provider.findAll({
      where: {
        accept: null,
      },
      include: [{ model: File, as: 'avatar' },
       { model: File, as: 'crmv_frente' }, 
       { model: File, as: 'crmv_verso' }]
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
