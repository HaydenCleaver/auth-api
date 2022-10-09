'use strict';

const { secretRoute } = require('../../auth/routes/routes');
const supertest = require('supertest');
const server = require('../../server');
const mockRequest = supertest(server);
process.env.SECRET = 'TEST SECRET';



describe('testing the users route', () => {

  const res = {
    send: jest.fn(() => res),
    status: jest.fn(()=> res),
    json: jest.fn(() => res),
  };
  const next = jest.fn();

  test('testing secret route', () => {
    // let res = await mockRequest.get('/secret').send({

    //   expect(res.status)
    // })

    expect(res.status).toEqual(200);
    expect(res.body.username).toEqual('user');
  });
});

