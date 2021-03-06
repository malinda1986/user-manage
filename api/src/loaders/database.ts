import { SEQ_DATABASE } from "../config/sequelize";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  SEQ_DATABASE.DATABASE,
  SEQ_DATABASE.USERNAME,
  SEQ_DATABASE.PASSWORD,
  {
    host: SEQ_DATABASE.HOST,
    port: SEQ_DATABASE.PORT,
    logging: console.log,
    dialect: "postgres",
    pool: {
      max: 30,
      min: 0,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to DB',  '🗄️')
  })
  .catch((err) => {
    console.error('Unable to connect to the DB', err)
  })

export default sequelize
