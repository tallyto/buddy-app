/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../util/truncate');

describe('pet', () => {
  // beforeEach(async () => {
  //   await truncate();
  // });
  it('Deve cadastrar um pet', async () => {
    const user = { email: 'rodrigues.tallyto@hotmail.com', password: '123321' };
    const pets = {
      name: 'Pretinha', raca: 'Vira-lata', genero: 'Cachorro', descricao: 'Matadora', idade: 3,
    };
    await request(app).post('/users').send(user);
    const response = await request(app).post('/sessions').send(user);
    const pet = await request(app).post('/pets').send(pets).set('Authorization', `Bearer ${response.body.token}`);
    expect(pet.body).toHaveProperty('id');
  });

  it('Deve falhar na validação', async () => {
    const user = { email: 'rodrigues.tallyto@hotmail.com', password: '123321' };
    const pets = {
      raca: 'Vira-lata', genero: 'Cachorro', descricao: 'Matadora', idade: 3,
    };
    await request(app).post('/users').send(user);
    const response = await request(app).post('/sessions').send(user);
    const pet = await request(app).post('/pets').send(pets).set('Authorization', `Bearer ${response.body.token}`);
    expect(pet.status).toEqual(400);
  });

  it('Deve atualizar um pet', async () => {
    const user = { email: 'rodrigues.tallyto@hotmail.com', password: '123321' };
    const pets = {
      name: 'Pretinha', raca: 'Vira-lata', genero: 'Cachorro', descricao: 'Matadora', idade: 3,
    };
    await request(app).post('/users').send(user);
    const session = await request(app).post('/sessions').send(user);
    const pet = await request(app).post('/pets').send(pets).set('Authorization', `Bearer ${session.body.token}`);
    const result = await request(app).put(`/pets/${pet.body.id}`).send({ ...pets, name: 'Pretinha do mal' })
      .set('Authorization', `Bearer ${session.body.token}`);
    expect(result.body).toHaveProperty('id');
  });

  it('Deve listar todos os pets', async () => {
    const response = await request(app).get('/pets/all');
    expect(Array.isArray(response.body));
  });
});
