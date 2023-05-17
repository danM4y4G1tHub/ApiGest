import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { IPDirectionModel } from "./IPDirection.model.js";

export const DeviceModel = sequelize.define(
  "Device",
  {
    idDevice: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    typeDevice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

DeviceModel.belongsToMany(IPDirectionModel, { through: "DeviceIPDirection" });
IPDirectionModel.belongsToMany(DeviceModel, { through: "DeviceIPDirection" });
