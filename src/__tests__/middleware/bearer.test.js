'use strict';

const SECRET = 'SECRET';

const bearer = require('../../auth/middleware/bearer');
const { db, users } = require('../../auth/models/index');
const jwt = require('jsonwebtoken');

let userInfo = {
  admin : { username: 'admin', password: 'password'},
};

beforeAll(async () => {
  await db.sync();
  await users.create(userInfo.admin);
});
afterAll(async () => {
  await db.drop();
});

describe('Auth Middleware', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
    json: jest.fn(() => res),
  };

  const next = jest.fn();

  describe('user authentication', () => {

    test('fails a login for a user with incorrect token', () => {
      req.headers = {
        authorization: 'Bearer badtoken',
      };

      return bearer(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });
    });

    test('logs in with proper token', () => {
      const user = { username: 'admin'};
      const token = jwt.sign(user, SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return bearer(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });
    });
  });
});
