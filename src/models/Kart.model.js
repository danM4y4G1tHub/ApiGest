import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const KartModel = sequelize.define(
  "Kart",
  {
    idKart: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idProd: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nameProd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lotProd: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idBK: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nameApplic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefApplic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailApplic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
  }
);
