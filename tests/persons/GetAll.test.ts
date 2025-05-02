import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Persons - Get All', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'getall-getall@mail.com';
    await testServer.post('/register').send({ name: 'Teste', email, password: '123456' });
    const signInRes = await testServer.post('/login').send({ email, password: '123456' });

    accessToken = signInRes.body.accessToken;
  });

  let cityId: number | undefined = undefined;
  beforeAll(async () => {

    const resCityCreated = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Cidade' });

    cityId = resCityCreated.body;
  });

  it('Busca todos os registros', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "matheusgetall@mail.com",
        firstName: "Matheus",
        lastName: "Prado",
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});