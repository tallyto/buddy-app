const Promocoes = require('../models/Promocoes');
const File = require('../models/File');

class PromocoesController {
  async getPromocoes(req, res) {
    const promocoes = await Promocoes.findAll({include: [{
      model: File,
      as: 'avatar',
    }]});

    return res.json(promocoes);
  }

  async store(req, res) {
    const { avatar_id } = req.body;
    try {
      if (avatar_id) {
        const avatar = await File.findByPk(avatar_id);
        if (!avatar) {
          return res.status(401).json({ error: 'avatar não encontrado' });
        }
      }

      const promocoes = await Promocoes.create({...req.body, admin_id: req.adminId});

      return res.json(promocoes);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    const promocoes = await Promocoes.findByPk(req.params.id);

    if (!promocoes) {
      return res.status(401).json({ error: 'promocoes não encontrado' });
    }

    await promocoes.update(req.body);

    return res.json(promocoes);
  }

  async delete(req, res) {
    const promocoes = await Promocoes.findByPk(req.params.id);

    if (!promocoes) {
      return res.status(400).json({ error: 'promocoes não encontrado' });
    }

    await promocoes.destroy();

    return res.json();
  }
}

module.exports = new PromocoesController();
