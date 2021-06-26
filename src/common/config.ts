import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const config = {
  NODE_ENV: process.env['NODE_ENV'],

  PORT: Number(process.env['PORT']) || 4000,

  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  JWT_EXPIRATION: process.env['JWT_SECRET_KEY'],

  DB_PORT: Number(process.env['DB_PORT']),
  DB_TYPE: process.env['DB_TYPE'],
  DB_HOST: process.env['DB_HOST'],

  POSTGRES_DB: process.env['POSTGRES_DB'],
  POSTGRES_USER: process.env['POSTGRES_USER'],
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
};

export default config;
