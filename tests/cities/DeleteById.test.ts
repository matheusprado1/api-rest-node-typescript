import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - Delete', () => {

  it('Apaga registro', async () => {

    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Araguari' });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/cities/${res1.body}`)
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT)
  });

  it('Não apaga registro invalido', async () => {

    const res1 = await testServer
      .delete('/cities/99999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});