import {agent as request} from 'supertest';
import app from '../app';

describe('volumes', () => {
  it('get all volumes', async () => {
    const response = await request(app).get('/volumes');
    expect(response.statusCode).toBe(200);
  });
});
