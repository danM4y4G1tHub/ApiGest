import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("apigest", "postgres", "Hawkeye", {
  // host: "localhost",
  // dialect: "postgres",
  dialect: "sqlite",
  storage: "./database.sqlite",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
