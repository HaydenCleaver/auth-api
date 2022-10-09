'use strict';

process.env.SECRET = 'TEST_SECRET';

const supertest = require('supertest');
const { server } = require('../../server');
const request = supertest(server);
const { db } = require('../../auth/models/index');


beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('testing the Signup Handler', () => {

  const res = {
    send: jest.fn(() => res),
    status: jest.fn(() => res),
    json: jest.fn(() => res),
  };
  const next = jest.fn();

  test('Should respond with a new user if user and password are present', async () => {

    let req = {
      body: {
        username: 'test',
        password: 'test',
      },
    };

    await request.post('/signup').send(req);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.any(Object),
        token: expect.any(String),
      }),
    );
  });

  test('Should call the error handler if no body attached to request', async () => {
    let req = {};
    jest.clearAllMocks();

    await request.post('/signup').send(req);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});
