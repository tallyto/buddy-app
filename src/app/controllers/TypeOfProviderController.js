const Provider = require('../models/Provider');
const File = require('../models/File');
const Categoria = require('../models/Categoria');

class TypeOfProvider {
  async passeador(req, res) {
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
        },
      ],
    });

    return res.json(passeador);
  }

  async clinica(req, res) {
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
        'clinica',
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
        },
      ],

    });
    return res.json(clinica);
  }

  async adestrador(req, res) {
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
        },
      ],
    });
    return res.json(adestrador);
  }
}

module.exports = new TypeOfProvider();
