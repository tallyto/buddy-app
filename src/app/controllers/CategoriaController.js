/* eslint-disable camelcase */
const Yup = require('yup');
const Categoria = require('./../models/Categoria');

class PetsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      name,
    } = req.body;

    const categoria = await Categoria.create({

      name,


    });


    return res.json(categoria);
  }
}

module.exports = new PetsController();
