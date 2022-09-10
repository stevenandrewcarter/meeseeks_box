import {Router, Request, Response} from 'express';
import Docker from 'dockerode';
import {Logger} from '../utils/logger';

export const imagesRoute = Router();
const docker = new Docker();

imagesRoute.get('/images', async (_req: Request, res: Response) => {
  try {
    const images = await docker.listImages();
    Logger.debug(`Retrieved ${images.length} image(s) from the Docker Engine...`);
    res.status(200).json(images);
  } catch (err) {
    res.status(400).json(err);
  }
});
