import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - Get by Id', () => {

  it('Busca registro por id', async () => {

    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Araguari' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/cities/${res1.body}`)
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('name');
  });

  it('Tenta buscar registro que não existe', async () => {

    const res1 = await testServer
      .get('/cities/99999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});