const Provider = require('../models/Provider');

const File = require('../models/File');
const Categoria = require('../models/Categoria');

class PasseadorController {
  async index(req, res) {
    const passeador = await Provider.findAll({
      where: {
        passeador: true,
      },
      attributes: [
        'id',
        'name',
        'email',
        'telefone',
        'cpf',
        'bio',
        'endereco',
        'passeador',
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

    return res.json(passeador);
  }
}

module.exports = new PasseadorController();
