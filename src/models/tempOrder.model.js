import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const TempOrderModel = sequelize.define(
  "OrderTemp",
  {
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
    idProd: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idBK: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
