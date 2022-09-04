import {Router, Request, Response} from 'express';
import Docker from 'dockerode';

export const networksRoute = Router();
const docker = new Docker();

networksRoute.get('/networks', async (_req: Request, res: Response) => {
  try {
    const networks = await docker.listNetworks();
    res.json(networks);
  } catch (err) {
    res.status(400).json(err);
  }
});
