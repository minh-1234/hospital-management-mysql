import { Sequelize } from "sequelize"
import { env } from "./environment.js";
// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(env.DATABASE_NAME, env.USER_DB, env.PASSWORD_DB, {
  host: 'localhost',
  dialect: 'mysql'
})
export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
export const close = () => {
  sequelize.close()
}