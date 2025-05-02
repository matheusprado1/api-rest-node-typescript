import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - Get All', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'getall-cidades@mail.com';
    await testServer.post('/register').send({ name: 'Teste', email, password: '123456' });
    const signInRes = await testServer.post('/login').send({ email, password: '123456' });

    accessToken = signInRes.body.accessToken;
  });

  it('Busca todos os registros', async () => {
    const res1 = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Araguari' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});