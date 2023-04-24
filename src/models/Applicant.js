import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Solicitude } from "../models/Solicitude.js";

export const Applicant = sequelize.define("Applicant", {
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

Applicant.hasOne(Solicitude);
Solicitude.belongsTo(Applicant);
