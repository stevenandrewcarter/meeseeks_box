import {Router, Request, Response} from 'express';
import Docker from 'dockerode';

export const volumesRoute = Router();
const docker = new Docker();

volumesRoute.get('/volumes', async (_req: Request, res: Response) => {
  try {
    const volumes = await docker.listVolumes();
    res.json(volumes);
  } catch (err) {
    res.status(400).json(err);
  }
});
