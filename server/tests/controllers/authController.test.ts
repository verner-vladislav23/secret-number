import app from '../../src/server';
import * as request from 'supertest';

import { AuthController } from '../../src/controllers/AuthController';
import { HttpStatus } from "../../src/helpers/HttpStatus";

describe('AuthController', () => {
  const CONTENT_TYPE_HEADER: string = 'application/json';
  // TODO: полный путь надо доставать из роутинга
  const LOGIN_PATH_ROUTE: string = '/api/v1/auth/login';

  it(`POST /login without body should return ${HttpStatus.UNPROCESSABLE_ENTITY} status`, async () => {
    const response = await request(app).post(LOGIN_PATH_ROUTE);

    expect(response.statusCode).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  it(`POST /login empty login should return ${HttpStatus.UNPROCESSABLE_ENTITY} status`, async () => {
    const mockBody = {
      login: '',
      password: ''
    };

    const response = await request(app)
      .post(LOGIN_PATH_ROUTE)
      .set('Content-Type', CONTENT_TYPE_HEADER)
      .send(mockBody);

    expect(response.statusCode).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(response.body.errors.name).toBe('ValidationError');
  });

  it('POST /login with body: { login: 12, password: 123151251 }', async () => {
    const mockBody = {
      login: '12',
      password: '123151251,'
    };

    const response = await request(app)
      .post(LOGIN_PATH_ROUTE)
      .set('Content-Type', CONTENT_TYPE_HEADER)
      .send(mockBody);

    expect(response.statusCode).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  })
});
