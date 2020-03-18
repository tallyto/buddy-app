const User = require('../models/User');
const File = require('../models/File');

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      whare: { provider: false },
      attributes: ['id', 'email', 'name', 'avatar_id'],
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
