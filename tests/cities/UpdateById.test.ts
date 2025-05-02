import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - Update by Id', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'update-cidades@mail.com';
    await testServer.post('/register').send({ name: 'Teste', email, password: '123456' });
    const signInRes = await testServer.post('/login').send({ email, password: '123456' });

    accessToken = signInRes.body.accessToken;
  });

  it('Atualiza registro', async () => {
    const res1 = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Araguari' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/cities/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Ari' });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta atualizar registro que não existe', async () => {
    const res1 = await testServer
      .put('/cities/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Araguari' });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
