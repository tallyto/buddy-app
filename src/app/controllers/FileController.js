const File = require('../models/File');
const removeImageS3 = require('../../config/removeImageS3.js');

class FileController {
  async index(req, res) {
    const file = await File.findAll();
    return res.json(file);
  }

  async store(req, res) {
    const {
      originalname: name, size, key, location: url = '',
    } = req.file;

    const file = await File.create({
      name,
      size,
      key,
      url,
    });

    return res.json(file);
  }

  async delete(req, res) {
    const file = await File.findByPk(req.params.id);

    if (!file) {
      return res.status(400).json({ error: 'arquivo não encontrado' });
    }

    removeImageS3(file.key);

    await file.destroy();

    return res.json();
  }
}

module.exports = new FileController();
