const request = require('supertest');
const app = require('../app');

describe('networks', () => {
  it('get all networks', async () => {
    const response = await request(app).get('/networks');
    expect(response.statusCode).toBe(200);
  });
});
