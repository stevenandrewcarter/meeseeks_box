import {Router, Request, Response} from 'express';
import Docker from 'dockerode';

export const imagesRoute = Router();
const docker = new Docker();

imagesRoute.get('/images', async (_req: Request, res: Response) => {
  try {
    const images = await docker.listImages();
    res.json(images);
  } catch (err) {
    res.status(400).json(err);
  }
});
