import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Users - SignIn', () => {
  beforeAll(async () => {
    await testServer.post('/register').send({
      name: 'User',
      email: 'user@mail.com',
      password: '123456',
    })
  });

  it('Faz login', async () => {
    const resLogin = await testServer
      .post('/login')
      .send({
        email: "user@mail.com",
        password: "123456",
      });

    expect(resLogin.statusCode).toEqual(StatusCodes.OK);
    expect(resLogin.body).toHaveProperty('accessToken');
  });
  it('Senha errada', async () => {
    const resLogin = await testServer
      .post('/login')
      .send({
        email: "user@mail.com",
        password: "12345678",
      });

    expect(resLogin.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resLogin.body).toHaveProperty('errors.default');
  });
  it('Email errado', async () => {
    const resLogin = await testServer
      .post('/login')
      .send({
        email: "ser@mail.com",
        password: "123456",
      });

    expect(resLogin.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resLogin.body).toHaveProperty('errors.default');
  });
  it('Formato de email errado', async () => {
    const resLogin = await testServer
      .post('/login')
      .send({
        email: "usermail.com",
        password: "123456",
      });

    expect(resLogin.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resLogin.body).toHaveProperty('errors.body.email');
  });
  it('Senha muito pequena', async () => {
    const resLogin = await testServer
      .post('/login')
      .send({
        email: "user@mail.com",
        password: "123",
      });

    expect(resLogin.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resLogin.body).toHaveProperty('errors.body.password');
  });
  it('Nao informado senha', async () => {
    const resLogin = await testServer
      .post('/login')
      .send({
        email: "user@mail.com",
      });

    expect(resLogin.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resLogin.body).toHaveProperty('errors.body.password');
  });
  it('Nao informado email', async () => {
    const resLogin = await testServer
      .post('/login')
      .send({
        password: "123456",
      });

    expect(resLogin.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resLogin.body).toHaveProperty('errors.body.email');
  });
});