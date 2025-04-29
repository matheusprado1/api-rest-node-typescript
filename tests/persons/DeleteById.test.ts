import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Persons - Delete', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCityCreated = await testServer
      .post('/cities')
      .send({ name: 'Araguari' });

    cityId = resCityCreated.body;
  });

  it('Apaga registro', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .send({
        cityId,
        email: "matheusdelete@mail.com",
        firstName: "Matheus",
        lastName: "Prado",
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/persons/${resCreatedPerson.body}`)
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT)
  });

  it('Tenta apagar registro invalido', async () => {
    const res1 = await testServer
      .delete('/persons/99999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});