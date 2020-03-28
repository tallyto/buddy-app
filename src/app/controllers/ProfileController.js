const User = require('../models/User');
const File = require('../models/File');
const Categoria = require('../models/Categoria');

const Provider = require('../models/Provider');

class ProfileController {
  async user(req, res) {
    try {
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
    } catch (error) {
      return res.json({ error: 'Houve um erro ao carregar o perfil' });
    }
  }

  async provider(req, res) {
    try {
      const provider = await Provider.findOne({
        where: { id: req.providerId },
        attributes: [
          'id',
          'name',
          'email',
          'endereco',
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
            attributes: ['path', 'name', 'url'],
          },
          {
            model: Categoria,
            as: 'categoria',
            attributes: ['name'],
          },
        ],
      });

      return res.json(provider);
    } catch (error) {
      return res.json({ error: 'Houve um erro ao carregar o perfil' });
    }
  }
}

module.exports = new ProfileController();
