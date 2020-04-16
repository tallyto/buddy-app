/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../util/truncate');

describe('Session', () => {
  it('Deve fazer login', async () => {
    const user = { email: 'rodrigues.tallyto@hotmail.com', password: '123321' };
    await request(app).post('/users').send(user);
    const response = await request(app).post('/sessions').send(user);

    expect(response.body).toHaveProperty('token');
  });

  it('Deve falhar o fazer login com senha errada', async () => {
    const user = { email: 'rodrigues.tallyto@hotmail.com', password: '123321' };
    await request(app).post('/users').send(user);
    const response = await request(app).post('/sessions').send({ ...user, password: 'password' });
    expect(response.status).toEqual(401);
  });

  it('Deve falhar o fazer login email errado', async () => {
    const user = { email: 'rodrigues.tallyto@hotmail.com', password: '123321' };
    await request(app).post('/users').send(user);
    const response = await request(app).post('/sessions').send({ ...user, email: 'usuario@usuario.com' });
    expect(response.status).toEqual(401);
  });

  it('Deve falhar ao colocar dados invalidos', async () => {
    const user = { email: 'rodrigues.tallyto@hotmail.com', password: '123321' };
    const response = await request(app).post('/sessions').send({ ...user, email: 'usuario@usuario' });
    expect(response.status).toEqual(400);
  });
});
