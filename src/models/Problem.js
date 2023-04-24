import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Problem = sequelize.define( "Problem", {
    idProb: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameProb: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});