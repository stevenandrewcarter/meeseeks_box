import Winston from 'winston';

const level = () => {
  const env = process.env.NODE_ENV ?? 'development';
  return env === 'development' ? 'debug' : 'warn';
};

Winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
});

const format = Winston.format.combine(
  Winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
  Winston.format.colorize({all: true}),
  Winston.format.printf((info) => `${info.timestap} ${info.level}: ${info.message}`),
);

const transports = [
  new Winston.transports.Console(),
];

export const Logger: Winston.Logger = Winston.createLogger({
  level: level(),
  levels: {error: 0, warn: 1, info: 2, http: 3, debug: 4},
  format,
  transports,
});
