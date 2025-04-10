import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';




describe('Cidades - Create', () => {


  it('Cria registro', async () => {

    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Araguari' });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

  });

  it('Não pode criar um registro com nome muito curto', async () => {

    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Ar' });


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.name');

  });

});