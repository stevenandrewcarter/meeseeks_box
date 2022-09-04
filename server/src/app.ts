import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import {Routes} from './routes';
import {morganMiddleware} from './middlewares/morgan.middleware';

const app: Express = express();

app.use(cors());
app.use(morganMiddleware);
app.use(express.json());
// app.use(require('./routes/record'));
// app.use('/containers', require('./routes/containers'));
app.use('/', Routes);

// Global Error handling
// app.use((err, _req, res) => {
//   console.log(err.stack);
//   res.status(500).send('Something broke!');
// });

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

export default app;
