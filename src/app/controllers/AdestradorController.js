const Provider = require('../models/Provider');
const File = require('../models/File');
const Categoria = require('../models/Categoria');

class AdestradorController {
  async index(req, res) {
    const adestrador = await Provider.findAll({
      where: {
        adestrador: true,
      },
      attributes: [
        'id',
        'name',
        'email',
        'telefone',
        'cpf',
        'bio',
        'endereco',
        'adestrador',
        'nascimento',
        'avatar_id',
        'categoria_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
        },
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['name'],
        },
      ],
    });

    return res.json(adestrador);
  }
}


module.exports = new AdestradorController();
