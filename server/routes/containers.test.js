const request = require('supertest');
const app = require('../app');

describe('a test', () => {
  it('should request', async () => {
    const response = await request(app).get('/containers');
    expect(response.statusCode).toBe(200);
  });
});
