import {agent as request} from 'supertest';
import app from '../app';

describe('images', () => {
  it('get all images', async () => {
    const response = await request(app).get('/images');
    expect(response.statusCode).toBe(200);
  });
});
