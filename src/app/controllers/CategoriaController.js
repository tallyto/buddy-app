/* eslint-disable camelcase */
const Yup = require('yup');
const Categoria = require('../models/Categoria');

class CategoriaController {
  async index(req, res) {
    const categoria = await Categoria.findAll();
    return res.json(categoria);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const categoria = await Categoria.create(req.body);

    return res.json(categoria);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não existe' });
    }

    await categoria.update(req.body);

    return res.json(categoria);
  }

  async delete(req, res) {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não existe' });
    }
    await categoria.destroy();

    return res.json();
  }
}

module.exports = new CategoriaController();
