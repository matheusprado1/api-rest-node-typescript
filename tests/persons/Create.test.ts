import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Persons - Create', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-person@mail.com';
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

  it('Cria registro', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "matheus@mail.com",
        firstName: "Matheus",
        lastName: "Prado"
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resCreatedPerson.body).toEqual('number');
  });
  it('Cria registro 2', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "matheus2@mail.com",
        firstName: "Matheus",
        lastName: "Prado"
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resCreatedPerson.body).toEqual('number');
  });
  it('Tenta criar registro com email duplicado', async () => {
    const resCreatedPerson1 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "matheusduplicado@mail.com",
        firstName: "Matheus",
        lastName: "Prado"
      });
    expect(resCreatedPerson1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resCreatedPerson1.body).toEqual('number');

    const resCreatedPerson2 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "matheusduplicado@mail.com",
        firstName: "duplicado",
        lastName: "duplicado"
      });
    expect(resCreatedPerson2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resCreatedPerson2.body).toHaveProperty('errors.default');
  });
  it('Tenta criar registro com firstName muito curto', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "matheus3@mail.com",
        firstName: "Ma",
        lastName: "Prado"
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedPerson.body).toHaveProperty('errors.body.firstName');
  });
  it('Tenta criar um registro sem firstName', async () => {
    const res1 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        email: "matheusnofirstname@mail.com",
        lastName: "Prado",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.firstName');
  });
  it('Tenta criar registro sem email', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        firstName: "Matheus",
        lastName: "Prado"
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedPerson.body).toHaveProperty('errors.body.email');
  });
  it('Tenta criar registro com email invalido', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId,
        firstName: "Matheus",
        email: "matheusmail.com",
        lastName: "Prado"
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedPerson.body).toHaveProperty('errors.body.email');
  });
  it('Tenta criar registro sem cityId', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        firstName: "Matheus",
        email: "matheusnoid@mail.com",
        lastName: "Prado"
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedPerson.body).toHaveProperty('errors.body.cityId');
  });
  it('Tenta criar registro com cityId invalido', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cityId: 'abc',
        firstName: "Matheus",
        email: "matheusnoid@mail.com",
        lastName: "Prado"
      });

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedPerson.body).toHaveProperty('errors.body.cityId');
  });
  it('Tenta criar registro sem enviar nenhuma propriedade', async () => {
    const resCreatedPerson = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({});

    expect(resCreatedPerson.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedPerson.body).toHaveProperty('errors.body.email');
    expect(resCreatedPerson.body).toHaveProperty('errors.body.cityId');
    expect(resCreatedPerson.body).toHaveProperty('errors.body.firstName');
    expect(resCreatedPerson.body).toHaveProperty('errors.body.lastName');
  });
});