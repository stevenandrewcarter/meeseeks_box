import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import {Routes} from './routes';
import {init} from './models';
import {Logger} from './utils/logger';
import morgan from 'morgan';

init();
const app: Express = express();

app.use(cors());
app.use(morgan('combined', {
  stream: {
    write: (message) => Logger.info(message),
  },
}));
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
