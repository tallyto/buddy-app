const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../util/truncate');

describe('categorias', () => {
  it('Deve cadastrar uma categoria', async () => {
    const categoria = { name: 'Massagista' };
    const response = await request(app)
      .post('/categorias')
      .send(categoria);

    expect(response.body).toHaveProperty('id');
  });

  it('Deve listar todas as categorias', async () => {
    const categoria = { name: 'Massagista' };
    await request(app)
      .post('/categorias')
      .send(categoria);

    const response = await request(app).get('/categorias');

    expect(Array.isArray(response.body));
  });

  it('Deve atualizar uma categoria', async () => {
    const categoria = { name: 'Massagista' };
    const data = await request(app)
      .post('/categorias')
      .send(categoria);

    const response = await request(app)
      .put(`/categorias/${data.body.id}`)
      .send({ name: 'Super Massagista' });

    expect(response.body.name).toEqual('Super Massagista');
  });

  it('Deve deletar uma categoria', async () => {
    const categoria = { name: 'Massagista' };
    const data = await request(app)
      .post('/categorias')
      .send(categoria);

    const response = await request(app)
      .delete(`/categorias/${data.body.id}`);

    expect(response.status).toEqual(200);
  });
});
