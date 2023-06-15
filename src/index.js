import "dotenv/config";

import { sequelize } from "./database/database.js";
import app from "./app/app.js";

import cron from "node-cron";
import { registerOrder } from "./controllers/applyOrder.js";

async function main() {
  try {
    await sequelize.sync({ alter: false });
    console.log("Conexión establecida con éxito 🦅");
    app.listen(3001, () => console.log("Servidor ejecutado con exito 🦉"));
    cron.schedule("0 0 * * *", () => {
      registerOrder();
    });
  } catch (error) {
    console.error("Conexión fallida 😢", error);
  }
}

main();
