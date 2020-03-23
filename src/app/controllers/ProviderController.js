const User = require('../models/User');
const File = require('../models/File');

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'email', 'name', 'avatar_id', 'provider'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'name', 'url'],
        },
      ],
    });
    res.json(providers);
  }
}

module.exports = new ProviderController();
