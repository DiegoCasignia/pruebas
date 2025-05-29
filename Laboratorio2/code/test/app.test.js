const request = require('supertest');
const createApp = require('../src/app');

let app;

beforeAll(() => {
  app = createApp();
});

describe('App.js', () => {
  test('should return 404 for undefined routes', async () => {
    const res = await request(app).get('/some/nonexistent/route');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: 'Route not found' });
  });
});
