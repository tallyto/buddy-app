const Provider = require('../models/Provider');

const File = require('../models/File');
const Categoria = require('../models/Categoria');

class PasseadorController {
  async index(req, res) {
    try {
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
            attributes: ['path', 'name', 'url'],
          },
          {
            model: Categoria,
            as: 'categoria',
            attributes: ['name'],
          },
        ],
      });

      return res.json(passeador);
    } catch (error) {
      return res.json({ error: 'Houve um erro ao listar passeadores' });
    }
  }
}

module.exports = new PasseadorController();
