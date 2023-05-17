import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const OrderModel = sequelize.define("Order", {
  idOrd: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lotProd: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dateOrd: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
