import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const IPDirectionModel = sequelize.define("IPDirection", {
    idIP: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ipDir: {
        type: DataTypes.STRING,
        allowNull: true
    }
});