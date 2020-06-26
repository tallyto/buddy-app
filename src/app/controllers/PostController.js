const Yup = require('yup');
const Post = require('../models/Post');

class PostController {
  async index(req, res) {
    const post = await Post.findAll();

    return res.json(post);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const post = await Post.create(req.body);

    return res.json(post);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      content: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(401).json({ error: 'Post não encontrado' });
    }

    await post.update(req.body);

    return res.json(post);
  }

  async delete(req, res) {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(400).json({ error: 'Post não encontrado' });
    }

    await post.destroy();

    return res.json();
  }
}

module.exports = new PostController();
