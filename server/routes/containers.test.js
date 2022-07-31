const request = require('supertest');
const app = require('../app');

describe('a test', () => {
  it('should get all containers', async () => {
    const response = await request(app).get('/containers');
    expect(response.statusCode).toBe(200);
  });

  it('should create a new containers', async () => {
    const response = await request(app).post('/containers');
    expect(response.statusCode).toBe(200);
  });
});
