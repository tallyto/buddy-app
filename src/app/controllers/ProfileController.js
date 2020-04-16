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
        {
          association: 'pets',
          attributes: [
            'id',
            'name',
            'raca',
            'genero',
            'descricao',
            'idade',
            'avatar_id',
          ],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'url'],
            },
          ],
        },
        {
          association: 'enderecos',
          attributes: [
            'id',
            'rua',
            'complemento',
            'cep',
            'bairro',
            'cidade',
            'user_id',
            'provider_id',
          ],
        },
        {
          association: 'credit_cards',
          attributes: [
            'id',
            'titular',
            'card_number',
            'validade',
            'cvv',
            'user_id',
          ],
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
        {
          association: 'enderecos',
          attributes: [
            'id',
            'rua',
            'complemento',
            'cep',
            'bairro',
            'cidade',
            'user_id',
            'provider_id',
          ],
        },
      ],
    });

    return res.json(provider);
  }
}

module.exports = new ProfileController();
