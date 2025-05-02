import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Persons - Get by Id', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'getbyid-getbyid@mail.com';
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

  it('Busca registro por id', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "matheusgetbyid@mail.com",
        firstName: "Matheus",
        lastName: "Prado"
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/persons/${resCreatedPerson.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('firstName');
  });
  it('Tenta buscar registro que não existe', async () => {
    const res1 = await testServer
      .get('/persons/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});