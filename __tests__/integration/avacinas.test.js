/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../util/truncate');

describe('vacinas', () => {
  it('deve cadastrar uma vacina', async () => {
    const user = { email: 'rodrigues.tallyto@hotmail.com', password: '123321' };
    const pet = {
      name: 'Pretinha',
      raca: 'Vira-lata',
      genero: 'Cachorro',
      descricao: 'Matadora',
      idade: 3,
    };
    await request(app)
      .post('/users')
      .send(user);
    const session = await request(app)
      .post('/sessions')
      .send(user);
    const pets = await request(app)
      .post('/pets')
      .send(pet)
      .set('Authorization', `Bearer ${session.body.token}`);

    const vacina = {
      vacina: 'febre amarela',
      data: '2020-04-25',
      revacinar: '2020-04-25',
      pet_id: pets.body.id,
      peso: 5,
    };

    const response = await request(app)
      .post('/vacinas')
      .send(vacina)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.body).toHaveProperty('id');
  });
});
