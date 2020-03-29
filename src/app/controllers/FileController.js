const File = require('../models/File');

class FileController {
  async store(req, res) {
    try {
      const { originalname: name, filename: path } = req.file;

      const file = await File.create({
        name, path,
      });

      return res.json(file);
    } catch (error) {
      return res.json({ error: 'Houve um erro ao cadastrar imagem' });
    }
  }

  async index(req, res) {
    try {
      const file = await File.findAll({
        attributes: ['id', 'path', 'name'],
      });
      return res.json(file);
    } catch (error) {
      return res.json({ error: 'Houve um erro ao listar todas as imagens' });
    }
  }
}

module.exports = new FileController();
