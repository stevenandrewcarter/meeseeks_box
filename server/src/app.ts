import express, {Express, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import {Routes} from './routes';
import {init} from './models';
import {Logger} from './utils/logger';
import morgan from 'morgan';
import bodyParser from 'body-parser';

init();
const app: Express = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined', {
  stream: {
    write: (message) => Logger.info(message),
  },
}));
app.use(express.json());
app.use('/api/', Routes);

// Global Error handling
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  Logger.error(err);
  res.status(500).json(err);
});

export default app;
