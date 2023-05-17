import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const SessionModel = sequelize.define(
  "Session",
  {
    idSess: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timesConnected: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IPDirection: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    device: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
