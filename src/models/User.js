import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Applicant } from "../models/Applicant.js";
import { Beekeeper } from "../models/Beekeeper.js";
import { Client } from "../models/Client.js";
import { Manager } from "../models/Manager.js";

export const User = sequelize.define("User", {
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
}
);

Applicant.belongsTo(User);
Beekeeper.belongsTo(User);
Client.belongsTo(User);
Manager.belongsTo(User);