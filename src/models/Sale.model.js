import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const SaleModel = sequelize.define(
  "Sale",
  {
    idSale: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lotProd: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dataSale: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
