import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - Delete', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'delete-cidades@mail.com';
    await testServer.post('/register').send({ name: 'Teste', email, password: '123456' });
    const signInRes = await testServer.post('/login').send({ email, password: '123456' });

    accessToken = signInRes.body.accessToken;
  });

  it('Apaga registro', async () => {
    const res1 = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Araguari' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/cities/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT)
  });
  it('Não apaga registro invalido', async () => {
    const res1 = await testServer
      .delete('/cities/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});