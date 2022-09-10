import Winston from 'winston';

const level = () => {
  const env = process.env.NODE_ENV ?? 'development';
  return env === 'development' ? 'debug' : 'warn';
};

const format = Winston.format.combine(
  Winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
  Winston.format.colorize({all: true}),
  Winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = [
  new Winston.transports.Console(),
];

export const Logger = Winston.createLogger({
  level: level(),
  format,
  transports,
});
