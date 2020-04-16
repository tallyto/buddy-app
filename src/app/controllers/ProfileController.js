const User = require('../models/User');
const File = require('../models/File');
const Categoria = require('../models/Categoria');
const Provider = require('../models/Provider');

class ProfileController {
  async user(req, res) {
    const user = await User.findOne({
      where: { id: req.userId },
      attributes: ['id', 'email', 'name', 'avatar_id', 'telefone'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'url'],
        },
      ],
    });

    return res.json(user);
  }

  async provider(req, res) {
    const provider = await Provider.findOne({
      where: { id: req.providerId },
      attributes: [
        'id',
        'name',
        'email',
        'telefone',
        'bio',
        'cpf',
        'nascimento',
        'passeador',
        'clinica',
        'adestrador',
        'avatar_id',
        'categoria_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'url'],
        },
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['name'],
        },
      ],
    });

    return res.json(provider);
  }
}

module.exports = new ProfileController();
