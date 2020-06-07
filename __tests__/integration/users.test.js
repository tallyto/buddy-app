const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../util/truncate');

describe('user', () => {
  it('Deve cadastar um usuario', async () => {
    const user = { email: 'rodrigues.tallyto@hotmail.com', password: '123321' };
    const response = await request(app).post('/users').send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('Deve falhar ao cadastar usuario com mesmo email', async () => {
    const user = { email: 'rodrigues.tallyto@hotmail.com', password: '123321' };
    await request(app).post('/users').send(user);
    const response = await request(app).post('/users').send(user);

    expect(response.status).toEqual(400);
  });

  it('Deve falhar ao cadastar usuario com dado errado', async () => {
    const user = { email: 'rodrigues', password: '123321' };
    const response = await request(app).post('/users').send(user);

    expect(response.status).toEqual(400);
  });

  it('Deve listar todos os usuarios', async () => {
    const user = { email: 'rodrigues@hotmail.com', password: '123321' };
    await request(app).post('/users').send(user);
    const response = await request(app).get('/users');
    expect(Array.isArray(response.body));
  });
});
