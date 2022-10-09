'use strict';

const supertest = require('supertest');
const { server } = require('../../server');
const mockRequest = supertest(server);
const { db } = require('../../auth/models/index');
const router = require('../../auth/routes/v1');
const {handleCreate, handleDelete, handleGetOne, handleGetAll, handleUpdate} = require('../../auth/routes/v1');


let modelData = {
  name: 'Shirt',
  color: 'Blue',
  size: 'Large',
};

let modelDataTwo = {
  name: 'Banana',
  calories: 10,
  type: 'Fruit',
};

beforeAll(async() => {
  await db.sync();
});
afterAll(async() => {
  await db.drop();
});

describe('API Server', () => {

  test('handles create request on v1 route',  async() => {

    const res = await mockRequest.post('/api/v1/clothes').send(modelData);

    expect(res.status).toEqual(201);
    expect(res.body.name).toEqual('Shirt');
    expect(res.body.color).toEqual('Blue');
    expect(res.body.size).toEqual('Large');
  });

  test('handles get one request on v1 route', async() => {
    const res = await mockRequest.get('/api/v1/clothes/1');

    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('Shirt');
    expect(res.body.color).toEqual('Blue');
    expect(res.body.size).toEqual('Large');
  });

  // test('handles get all request on v1 route', async() => {
  //   const res = await mockRequest.get('/api/v1/clothes');

  //   expect(res.status).toEqual(200);
  //   expect(res.length).toBe(1);
  // });

  test('handles update request on v1 route', async() => {

    modelData = {
      name: 'Shirt',
      color: 'Blue',
      size: 'Small',
    };

    const res = await mockRequest.post('/api/v1/clothes/1').send(modelData);

    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('Shirt');
    expect(res.body.color).toEqual('Blue');
    expect(res.body.size).toEqual('Small');
  });

  test('handles delete request on v1 route', async() => {

    const res = await mockRequest.post('/api/v1/clothes/1').send(modelData);

    expect(res.status).toEqual(200);

  });
});
