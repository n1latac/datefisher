import * as process from 'node:process';

export default () => ({
  PORT: process.env.PORT || 3000,
  DATABASE_HOST: process.env.HOST || 'localhost',
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
});
