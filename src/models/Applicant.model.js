import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const ApplicantModel = sequelize.define(
  "Applicant",
  {
    idApplic: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);