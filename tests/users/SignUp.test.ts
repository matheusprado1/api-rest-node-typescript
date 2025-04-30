import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Users - SignUp', () => {
  it('Cadastra usuario', async () => {
    const resCreatedUser = await testServer
      .post('/register')
      .send({
        name: "User",
        email: "user@mail.com",
        password: "123456",
      });

    expect(resCreatedUser.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resCreatedUser.body).toEqual('number');
  });
  it('Cadastra usuario 2', async () => {
    const resCreatedUser = await testServer
      .post('/register')
      .send({
        name: "User2",
        email: "user2@mail.com",
        password: "1234567",
      });

    expect(resCreatedUser.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resCreatedUser.body).toEqual('number');
  });
  it('Erro ao cadastrar usuario com email duplicado', async () => {
    const resCreatedUser = await testServer
      .post('/register')
      .send({
        name: "User Duplicated",
        email: "userduplicated@mail.com",
        password: "1234567",
      });

    expect(resCreatedUser.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resCreatedUser.body).toEqual('number');

    const resCreatedUser2 = await testServer
      .post('/register')
      .send({
        name: "User Duplicated",
        email: "userduplicated@mail.com",
        password: "1234567",
      });

    expect(resCreatedUser2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resCreatedUser2.body).toHaveProperty('errors.default');
  });
  it('Erro ao cadastrar usuario sem email', async () => {
    const resCreatedUser = await testServer
      .post('/register')
      .send({
        name: "User No Email",
        password: "1234567",
      });

    expect(resCreatedUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedUser.body).toHaveProperty('errors.body.email');
  });
  it('Erro ao cadastrar usuario sem o nome', async () => {
    const resCreatedUser = await testServer
      .post('/register')
      .send({
        email: "usernoname@mail.com",
        password: "1234567",
      });

    expect(resCreatedUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedUser.body).toHaveProperty('errors.body.name');
  });
  it('Erro ao cadastrar usuario sem a senha', async () => {
    const resCreatedUser = await testServer
      .post('/register')
      .send({
        name: "User No Password",
        email: "usernopassword@mail.com",
      });

    expect(resCreatedUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedUser.body).toHaveProperty('errors.body.password');
  });
  it('Erro ao cadastrar usuario com email invalido', async () => {
    const resCreatedUser = await testServer
      .post('/register')
      .send({
        name: "User Invalid Email",
        email: "mail.com",
        password: "123456",
      });

    expect(resCreatedUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedUser.body).toHaveProperty('errors.body.email');
  });
  it('Erro ao cadastrar usuario com senha muito pequena', async () => {
    const resCreatedUser = await testServer
      .post('/register')
      .send({
        name: "User Password",
        email: "user@mail.com",
        password: "12345",
      });

    expect(resCreatedUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedUser.body).toHaveProperty('errors.body.password');
  });
  it('Erro ao cadastrar usuario com nome muito pequeno', async () => {
    const resCreatedUser = await testServer
      .post('/register')
      .send({
        name: "Us",
        email: "user@mail.com",
        password: "123456",
      });

    expect(resCreatedUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatedUser.body).toHaveProperty('errors.body.name');
  });
});