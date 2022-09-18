import {Router, Request, Response, NextFunction} from 'express';
import Function from '../models/function';

export const functionsRoute = Router();

functionsRoute.get('/functions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = {where: req.query};
    const functions = await Function.findAll(filters);
    res.status(200).json(functions);
  } catch (err) {
    next(err);
  }
});

functionsRoute.post('/functions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Function.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});
