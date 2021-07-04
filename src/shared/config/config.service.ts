import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

@Injectable()
export class ConfigService {
  public NODE_ENV: string;

  public PORT: number;

  public JWT_SECRET_KEY: string;

  public JWT_EXPIRATION: string;

  public DB_PORT: number;

  public DB_TYPE: 'postgres' = 'postgres';

  public DB_HOST: string;

  public POSTGRES_DB: string;

  public POSTGRES_USER: string;

  public POSTGRES_PASSWORD: string;

  constructor() {
    this.NODE_ENV = process.env['NODE_ENV'] as string;

    this.PORT = Number(process.env['PORT']) || 4000;

    this.JWT_SECRET_KEY = process.env['JWT_SECRET_KEY'] as string;
    this.JWT_EXPIRATION = process.env['JWT_EXPIRATION'] as string;

    this.DB_PORT = Number(process.env['DB_PORT']);
    this.DB_TYPE = process.env['DB_TYPE'] as 'postgres';
    this.DB_HOST = process.env['DB_HOST'] as string;

    this.POSTGRES_DB = process.env['POSTGRES_DB'] as string;
    this.POSTGRES_USER = process.env['POSTGRES_USER'] as string;
    this.POSTGRES_PASSWORD = process.env['POSTGRES_PASSWORD'] as string;
  }
}
