const request = require('supertest');
const createApp = require('../src/app');

let app;

beforeAll(() => {
  app = createApp();
});

describe('User API', () => {
  test('GET /api/users should return an empty list initially', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/users should create an user', async () => {
    const newUser = {
      name: 'Diego Casignia',
      email: 'diego@dirdev.ec'
    };
    const res = await request(app).post('/api/users').send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(newUser);
  });

  test('POST /api/users should fail if data is incomplete', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Diego' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: 'Name and email are required' });
  });
});

