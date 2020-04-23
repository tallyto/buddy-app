/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../util/truncate');

describe('endereco', () => {
  it('Deve cadastrar um endereço', async () => {
    const address = {
      rua: 'CC-15',
      numero: '121',
      complemento: 'Casa',
      cep: '69318070',
      bairro: 'Conjunto Cidadao',
      cidade: 'Boa Vista',
    };

    const response = await request(app).post('/enderecos').send(address);

    expect(response.body).toHaveProperty('id');
  });


  it('Deve atualizar um endereco', async () => {
    const address = {
      rua: 'CC-15',
      numero: '121',
      complemento: 'Casa',
      cep: '69318070',
      bairro: 'Conjunto Cidadao',
      cidade: 'Boa Vista',
    };

    const antigo = await request(app).post('/enderecos').send(address);
    const novo = await request(app).put(`/enderecos/${antigo.body.id}`).send({ ...address, rua: 'dos bobos' });


    expect(novo.body.rua).toEqual('dos bobos');
  });

  it('Deve deletar um endereço', async () => {
    const address = {
      rua: 'CC-15',
      numero: '121',
      complemento: 'Casa',
      cep: '69318070',
      bairro: 'Conjunto Cidadao',
      cidade: 'Boa Vista',
    };

    const antigo = await request(app).post('/enderecos').send(address);
    const novo = await request(app).delete(`/enderecos/${antigo.body.id}`);


    expect(novo.status).toEqual(200);
  });

  it('Deve listar todos os enderecos', async () => {
    const response = await request(app).get('/enderecos');

    expect(Array.isArray(response));
  });
});
