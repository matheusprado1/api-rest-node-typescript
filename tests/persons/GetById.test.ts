import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Persons - Get by Id', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCityCreated = await testServer
      .post('/cities')
      .send({ name: 'Araguari' });

    cityId = resCityCreated.body;
  });

  it('Busca registro por id', async () => {

    const resCreatedPerson = await testServer
      .post('/persons')
      .send({
        cityId,
        email: "matheusgetbyid@mail.com",
        firstName: "Matheus",
        lastName: "Prado"
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/persons/${resCreatedPerson.body}`)
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('firstName');
  });

  it('Tenta buscar registro que não existe', async () => {

    const res1 = await testServer
      .get('/persons/99999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});