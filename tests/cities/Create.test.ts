import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - Create', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-cidades@mail.com';
    await testServer.post('/register').send({ name: 'Teste', email, password: '123456' });
    const signInRes = await testServer.post('/login').send({ email, password: '123456' });

    accessToken = signInRes.body.accessToken;
  });

  it('Tenta criar um registro sem token de acesso', async () => {
    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Araguari' });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');

  });
  it('Cria registro', async () => {
    const res1 = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Araguari' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

  });
  it('Tenta criar um registro com o nome muito curto', async () => {
    const res1 = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Ar' });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.name');
  });
});