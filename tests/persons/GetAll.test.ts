import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Persons - Get All', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCityCreated = await testServer
      .post('/cities')
      .send({ name: 'Araguari' });

    cityId = resCityCreated.body;
  });

  it('Busca todos os registros', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .send({
        cityId,
        email: "matheusgetall@mail.com",
        firstName: "Matheus",
        lastName: "Prado",
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/persons')
      .send();
    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});