import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Solicitude } from "./Solicitude.model.js";

export const Applicant = sequelize.define("Applicant", 
{   
    idApplic: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

Applicant.hasOne(Solicitude, 
{
    foreignKey: "idApplic",
    sourceKey: "idApplic"
});

Solicitude.belongsTo(Applicant, 
{
    foreignKey: "idApplic",
    targetKey: "idApplic"
});
