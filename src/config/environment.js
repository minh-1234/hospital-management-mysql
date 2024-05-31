import 'dotenv/config'

export const env = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  USER_DB: process.env.USER_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
  DATABASE_NAME: process.env.DATABASE_NAME,
  HOST_URL: process.env.HOST_URL,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  ROLE_ADMIN: process.env.ROLE_ADMIN,
  ROLE_USER: process.env.ROLE_USER,
  SALT: process.env.SALT
};
