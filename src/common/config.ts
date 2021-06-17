import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const config = {
  PORT: Number(process.env['PORT']) || 4000,
  NODE_ENV: process.env['NODE_ENV'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  DB_PORT: Number(process.env['DB_PORT']),
  DB_NAME: process.env['DB_NAME'],
  DB_USER: process.env['DB_USER'],
  DB_PASSWORD: process.env['DB_PASSWORD'],
  DB_TYPE: process.env['DB_TYPE'],
  DB_HOST: process.env['DB_HOST'],
};

export default config;
