import {Router, Request, Response} from 'express';
import Function from '../models/function';
import {Logger} from '../utils/logger';

export const functionsRoute = Router();

functionsRoute.get('/functions', async (req: Request, res: Response) => {
  try {
    const filters = {where: req.query};
    const functions = await Function.findAll(filters);
    res.status(200).json(functions);
  } catch (err) {
    Logger.error(err);
    res.status(400).json(err);
  }
});
