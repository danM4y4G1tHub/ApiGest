import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Solicitude = sequelize.define("Solicitude",
{
    idSol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nameApplic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastNameApplic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ciApplic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    certificApplic: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    telefApplic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emailApplic: {
     type: DataTypes.STRING,
     allowNull: true,
    },
    provApplic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    munApplic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true
    },
    noStreet: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});