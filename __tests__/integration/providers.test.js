/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../util/truncate');

describe('providers', () => {
  it('Deve cadastrar um provider', async () => {
    const provider = { email: 'provider@provider.com', password: '123321' };
    const response = await request(app)
      .post('/providers')
      .send(provider);

    expect(response.body).toHaveProperty('id');
  });

  it('Deve listar todos os providers', async () => {
    const response = await request(app).get('/providers');

    expect(Array.isArray(response.body));
  });

  it('Deve atualizar um provider', async () => {
    const provider = { email: 'provider@provider.com', password: '123321' };
    await request(app)
      .post('/providers')
      .send(provider);

    const session = await request(app)
      .post('/sessions/providers')
      .send(provider);

    const response = await request(app)
      .put('/providers')
      .send({
        name: 'provider',
        email: 'provider@provider.com',
        telefone: '95981243461',
        cpf: '02614566288',
        nascimento: '1996-06-04',
      }).set('Authorization', `Bearer ${session.body.token}`);

    expect(response.body.name === 'provider');
  });
});
