import "dotenv/config";

import { sequelize } from "./database/database.js";
import app from "./app/app.js";

import cron from "node-cron";
import { registerOrder } from "./controllers/applyOrder.js";

import { ApplicantModel } from "./models/Applicant.model.js";
import { BeekeeperModel } from "./models/Beekeeper.model.js";
import { ClientModel } from "./models/Client.model.js";
import { DeviceModel } from "./models/Device.model.js";
import { KartModel } from "./models/Kart.model.js";
import { ManagerModel } from "./models/Manager.model.js";
import { OrderModel } from "./models/Order.model.js";
import { TempOrderModel } from "./models/tempOrder.model.js";
import { ProblemModel } from "./models/Problem.model.js";
import { ProductModel } from "./models/Product.model.js";
import { SaleModel } from "./models/Sale.model.js";
import { SessionModel } from "./models/Session.model.js";
import { UserModel } from "./models/User.model.js";

async function clearDatabase() {
  try {
    await UserModel.destroy({ where: {} });
    await ApplicantModel.destroy({ where: {} });
    await BeekeeperModel.destroy({ where: {} });
    await ClientModel.destroy({ where: {} });
    await DeviceModel.destroy({ where: {} });
    await KartModel.destroy({ where: {} });
    await ManagerModel.destroy({ where: {} });
    await OrderModel.destroy({ where: {} });
    await TempOrderModel.destroy({ where: {} });
    await ProblemModel.destroy({ where: {} });
    await ProductModel.destroy({ where: {} });
    await SaleModel.destroy({ where: {} });
    await SessionModel.destroy({ where: {} });
    // Llama al método destroy en cada modelo para eliminar todos los registros
    console.log("La base de datos se ha limpiado correctamente.");
  } catch (error) {
    console.error("Error al limpiar la base de datos:", error);
  }
}

async function main() {
  try {
    await sequelize.sync({ alter: false });
    console.log("Conexión establecida con éxito 🦅");
    app.listen(3001, () => console.log("Servidor ejecutado con exito 🦉"));
    // clearDatabase();
    // cron.schedule("0 0 * * *", () => {
    //   registerOrder();
    // });
  } catch (error) {
    console.error("Conexión fallida 😢", error);
  }
}
main();

// Importa todos los modelos que necesites limpiar



