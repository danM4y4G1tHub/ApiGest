import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const DeviceModel = sequelize.define(
  "Device",
  {
    idDevice: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idSession: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeDevice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ipDir: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false,
  }
);
