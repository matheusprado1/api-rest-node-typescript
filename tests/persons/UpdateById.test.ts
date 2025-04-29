import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Persons - Update by Id', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCityCreated = await testServer
      .post('/cities')
      .send({ name: 'Araguari' });

    cityId = resCityCreated.body;
  });

  it('Atualiza registro', async () => {

    const resCreatedPerson = await testServer
      .post('/persons')
      .send({
        cityId,
        email: "matheusprado@mail.com",
        firstName: "Matheus",
        lastName: "Prado"
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/persons/${resCreatedPerson.body}`)
      .send({
        cityId,
        email: "matheusupdate@mail.com",
        firstName: "Matheus",
        lastName: "Prado de Oliveira",
      });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tenta atualizar registro que não existe', async () => {

    const res1 = await testServer
      .put('/persons/99999')
      .send({
        cityId,
        email: "matheusupdate1@mail.com",
        firstName: "Matheus",
        lastName: "Prado de Oliveira"
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
