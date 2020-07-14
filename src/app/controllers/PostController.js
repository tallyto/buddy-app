const Yup = require('yup');
const { response } = require('express');
const Post = require('../models/Post');
const File = require('../models/File');

class PostController {
  async getPosts(req, res) {
    const post = await Post.findAll();

    return res.json(post);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('titulo obrigatório'),
      content: Yup.string().required('conteúdo obrigatório'),
    });
    const { avatar_id } = req.body;
    try {
      await schema.validate(req.body);
      if (avatar_id) {
        const avatar = await File.findByPk(avatar_id);
        if (!avatar) {
          return res.status(401).json({ error: 'avatar não encontrado' });
        }
      }

      const post = await Post.create(req.body);

      return res.json(post);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(401).json({ error: 'post não encontrado' });
    }

    await post.update(req.body);

    return res.json(post);
  }

  async delete(req, res) {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(400).json({ error: 'post não encontrado' });
    }

    await post.destroy();

    return res.json();
  }
}

module.exports = new PostController();
