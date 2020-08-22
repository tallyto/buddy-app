const Provider = require('../models/Provider');
const File = require('../models/File');

class TypeOfProvider {
  async passeador(req, res) {
    const passeador = await Provider.findAll({
      where: {
        passeador: true,
        accept: true,
      },
      attributes: [
        'id',
        'name',
        'email',
        'telefone',
        'cpf',
        'bio',
        'passeador',
        'location',
        'notification',
        'avatar_id',
        'avaliacao',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
        },
      ],
      order: ['avaliacao'],
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
        'location',
        'notification',
        'avatar_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
        },
        {
          model: File,
          as: 'crmv_frente',
        },
        {
          model: File,
          as: 'crmv_verso',
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
        'location',
        'notification',
        'avatar_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
        },
      ],
    });
    return res.json(adestrador);
  }
}

module.exports = new TypeOfProvider();
