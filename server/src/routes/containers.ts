import {Router, Request, Response, NextFunction} from 'express';
import {Logger} from '../utils/logger';
import Docker from 'dockerode';

export const containersRoute = Router();
const docker = new Docker();

containersRoute.get('/containers', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const containers = await docker.listContainers({all: true});
    res.json(containers);
  } catch (err) {
    next(err);
  }
});

containersRoute.post('/containers', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const container = await docker.createContainer({Image: 'alpine', Cmd: ['/bin/sh'], name: 'alpine-test'});
    await container.start();
    res.status(201).json(container);
  } catch (err) {
    next(err);
  }
});

containersRoute.delete('/containers/:containerId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {containerId} = req.params;
    const container = docker.getContainer(containerId);
    Logger.debug(container);
    // await container.stop();
    await container.remove();
    res.status(200);
  } catch (err) {
    next(err);
  }
});
