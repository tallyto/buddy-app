const Yup = require('yup');
const Especialidade = require('../models/Especialidade');
const Provider = require('../models/Provider');
const File = require('../models/File');

class EspecialidadeController {
  async show(req, res) {
    const { name } = req.query;
    const especialidade = await Especialidade.findAll({
      where: { name },
      include: [
        {
          model: Provider,
          as: 'providers',
          attributes: ['id', 'name', 'crmv', 'bio', 'avatar_id'],
          include: [{
            model: File,
            as: 'avatar',
          }],
        },
      ],
    });

    return res.json(especialidade);
  }

  async store(req, res) {
    const { provider_id } = req.params;
    const { name } = req.body;

    const provider = await Provider.findByPk(provider_id);
    if (!provider) {
      return res.status(400).json({ error: 'usuário não encontrado' });
    }

    const [especialidade] = await Especialidade.findOrCreate({
      where: { name },
    });

    await provider.addEspecialidades(especialidade);

    return res.json(especialidade);
  }
}

module.exports = new EspecialidadeController();
