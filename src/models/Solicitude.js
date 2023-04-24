import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Solicitude = sequelize.define("Solicitude",
{
    idSol: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    nameSolicit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastNameSolicit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ciSolicit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    certificSolicit: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    telefSolicit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emailSolicit: {
     type: DataTypes.STRING,
     allowNull: true,
    },
    provSolicit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    munSolicit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dirSolicit: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});