import app from '../../src/server';
import * as request from 'supertest';

import { AuthController } from '../../src/controllers/AuthController';
import { HttpStatus } from "../../src/helpers/HttpStatus";

describe('AuthController', () => {
  const CONTENT_TYPE_HEADER: string = 'application/json';

  // TODO: полный путь надо доставать из роутинга
  const LOGIN_PATH_ROUTE: string = '/api/v1/auth/login';
  const REGISTRATION_PATH_ROUTE: string = '/api/v1/auth/registration';

  describe('POST /login', () => {

    it(`without body should return ${HttpStatus.UNPROCESSABLE_ENTITY} status`, async () => {
      const response = await request(app).post(LOGIN_PATH_ROUTE);

      expect(response.statusCode).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it(`empty login should return ${HttpStatus.UNPROCESSABLE_ENTITY} status`, async () => {
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

    it('with body: { login: 12, password: 123151251 }', async () => {
      const mockBody = {
        login: '12',
        password: '123151251,'
      };

      const response = await request(app)
        .post(LOGIN_PATH_ROUTE)
        .set('Content-Type', CONTENT_TYPE_HEADER)
        .send(mockBody);

      expect(response.statusCode).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('auth default user: name: test, login: test, password: 12345 should return not empty JWT', async () => {
      const mockBody = {
        login: 'test',
        password: '12345'
      };

      const response = await request(app)
        .post(LOGIN_PATH_ROUTE)
        .set('Content-Type', CONTENT_TYPE_HEADER)
        .send(mockBody);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body.token).not.toBe('');
    });

    it('auth with wrong credentials', async () => {
      const mockBody = {
        login: 'test5838812',
        password: '3cds391jdhr'
      };

      const response = await request(app)
        .post(LOGIN_PATH_ROUTE)
        .set('Content-Type', CONTENT_TYPE_HEADER)
        .send(mockBody);

      expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      expect(response.body.errorMessage).toBe('Некорректный логин или пароль');
    });
  });

  describe('POST /registration', () => {
    it(`without name should return ${HttpStatus.UNPROCESSABLE_ENTITY} status`, async () => {
      const mockBody = {
        login: 'test',
        password: '12345'
      };

      const response = await request(app)
        .post(REGISTRATION_PATH_ROUTE)
        .set('Content-Type', CONTENT_TYPE_HEADER)
        .send(mockBody);

      expect(response.statusCode).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(response.body.errors.name).toBe('ValidationError');
      expect(response.body.errors.message).toBe('name is a required field');
    });
  })
});
