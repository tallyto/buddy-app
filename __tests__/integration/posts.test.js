/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../util/truncate');

describe('posts', () => {
  it('Deve cadastrar um post', async () => {
    const post = { title: 'meu post', content: 'conteudo' };
    const response = await request(app).post('/posts').send(post);

    expect(response.body).toHaveProperty('id');
  });

  it('Deve listar todos os posts', async () => {
    const post = { title: 'meu post', content: 'conteudo' };
    await request(app).post('/posts').send(post);

    const response = await request(app).get('/posts');

    expect(Array.isArray(response.body));
  });

  it('Deve atualizar um post', async () => {
    const post = { title: 'meu post', content: 'conteudo' };
    const data = await request(app).post('/posts').send(post);

    const response = await request(app).put(`/posts/${data.body.id}`).send({ ...post, title: 'post' });

    expect(response.body.title).toEqual('post');
  });

  it('Deve deletar um post', async () => {
    const post = { title: 'meu post', content: 'conteudo' };
    const data = await request(app).post('/posts').send(post);

    const response = await request(app).delete(`/posts/${data.body.id}`);

    expect(response.status).toEqual(200);
  });
});
