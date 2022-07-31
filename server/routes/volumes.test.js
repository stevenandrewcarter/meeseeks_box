const request = require('supertest');
const app = require('../app');

describe('volumes', () => {
  it('get all volumes', async () => {
    const response = await request(app).get('/volumes');
    expect(response.statusCode).toBe(200);
  });
});
