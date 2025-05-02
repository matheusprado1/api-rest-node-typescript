import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Persons - Delete', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'deletebyid-person@mail.com';
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

  it('Apaga registro', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "matheusdelete@mail.com",
        firstName: "Matheus",
        lastName: "Prado",
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/persons/${resCreatedPerson.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT)
  });
  it('Tenta apagar registro invalido', async () => {
    const res1 = await testServer
      .delete('/persons/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});