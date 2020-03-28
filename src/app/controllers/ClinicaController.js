const Provider = require('../models/Provider');

const File = require('../models/File');
const Categoria = require('../models/Categoria');

class ClinicaController {
  async index(req, res) {
    try {
      const clinica = await Provider.findAll({
        where: {
          clinica: true,
        },
        attributes: [
          'id',
          'name',
          'email',
          'telefone',
          'cpf',
          'bio',
          'endereco',
          'clinica',
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

      return res.json(clinica);
    } catch (error) {
      return res.json({ error: 'Houve um erro ao listar clinica' });
    }
  }
}


module.exports = new ClinicaController();
