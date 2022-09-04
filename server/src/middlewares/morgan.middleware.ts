import morgan from 'morgan';
import {Logger} from '../utils/logger';

const stream = {
  write: (message: string) => Logger.http(message),
};

const skip = () => {
  return (process.env.NODE_ENV ?? 'development') === 'development';
};

export const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  {stream, skip},
);
