declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      JWT_SECRET_KEY: string;
      JWT_EXPIRATION: string;
      DB_TYPE: string;
      DB_HOST: string;
      DB_PORT: string;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
    }
  }
}

export {};
