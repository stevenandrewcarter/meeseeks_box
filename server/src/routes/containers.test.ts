import {agent as request} from 'supertest';
import app from '../app';

describe('containers', () => {
  it('should get all containers', async () => {
    const response = await request(app).get('/containers');
    expect(response.statusCode).toBe(200);
  });

  describe('create', () => {
    let containerId = '';

    it('should create a new containers', async () => {
      const response = await request(app).post('/containers');
      expect(response.statusCode).toBe(201);
      containerId = response.body.id;
    });

    afterAll(async () => {
      console.log(`ContainerID: ${containerId}`);
      if (containerId) {
        await request(app).delete(`/containers/${containerId}`);
      }
    });
  });
});
