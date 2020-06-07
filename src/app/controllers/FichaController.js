const Pet = require('../models/Pet');

class FichaController {
  async show(req, res) {
    const pet = await Pet.findByPk(req.params.id);

    return res.json(pet);
  }
}


module.exports = new FichaController();
