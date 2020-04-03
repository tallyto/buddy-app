const File = require('../models/File');

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name, path,
    });

    return res.json(file);
  }

  async index(req, res) {
    const file = await File.findAll({
      attributes: ['id', 'path', 'name'],
    });
    return res.json(file);
  }
}

module.exports = new FileController();
