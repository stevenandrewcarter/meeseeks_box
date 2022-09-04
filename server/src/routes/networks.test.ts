import {agent as request} from 'supertest';
import app from '../app';

describe('networks', () => {
  it('get all networks', async () => {
    const response = await request(app).get('/networks');
    expect(response.statusCode).toBe(200);
  });
});
