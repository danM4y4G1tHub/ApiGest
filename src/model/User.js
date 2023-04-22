import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const User = sequelize.define("users", {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rolUser: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }, 
}, 
{
    timestamps: false
}
);