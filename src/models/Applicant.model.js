import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { SolicitudeModel } from "./Solicitude.model.js";

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

ApplicantModel.hasOne(SolicitudeModel, {
  foreignKey: "idApplic",
  sourceKey: "idApplic",
});

SolicitudeModel.belongsTo(ApplicantModel, {
  foreignKey: "idApplic",
  targetKey: "idApplic",
});
