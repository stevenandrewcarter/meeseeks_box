import {Router} from 'express';
import {containersRoute} from './containers';
import {imagesRoute} from './images';
import {networksRoute} from './networks';
import {volumesRoute} from './volumes';

export const Routes = Router();
Routes.use(containersRoute);
Routes.use(imagesRoute);
Routes.use(networksRoute);
Routes.use(volumesRoute);
