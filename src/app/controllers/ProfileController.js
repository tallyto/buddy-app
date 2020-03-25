const User = require('../models/User');
const File = require('../models/File');

class ProfileController {
  async index(req, res) {
    const user = await User.findOne({
      where: { id: req.userId },
      attributes: ['id', 'email', 'name', 'avatar_id', 'endereco', 'telefone'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'name', 'url'],
        },
      ],
    });

    return res.json(user);
  }
}


module.exports = new ProfileController();
