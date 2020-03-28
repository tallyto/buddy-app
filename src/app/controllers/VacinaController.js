/* eslint-disable camelcase */
const Yup = require('yup');
const Vacinas = require('./../models/Vacina');

class PetsController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        tipo: Yup.string().required(),
        pet_id: Yup.number().required(),
        validade: Yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { tipo, pet_id, validade } = req.body;

      const data = new Date();
      const vacinas = await Vacinas.create({
        data,
        tipo,
        pet_id,
        validade,
      });

      return res.json(vacinas);
    } catch (error) {
      return res.json({ error: 'Erro ao cadastrar vacina' });
    }
  }

  async index(req, res) {
    try {
      const vacinas = await Vacinas.findAll();

      return res.json(vacinas);
    } catch (error) {
      return res.json({ error: 'Erro ao listar vacinas' });
    }
  }
}

module.exports = new PetsController();
