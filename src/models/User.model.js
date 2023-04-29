import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Applicant } from "./Applicant.model.js";
import { Beekeeper } from "./Beekeeper.model.js";
import { Client } from "./Client.model.js";
import { Manager } from "./Manager.model.js";
import { Session } from "./Session.model.js";

export const User = sequelize.define("User", 
{
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }, 
});

Applicant.belongsTo(User, 
{
    foreignKey: "idUser",
    target: "idUser"
});

Beekeeper.belongsTo(User, 
{
    foreignKey: "idUser",
    target: "idUser"
});

Client.belongsTo(User, 
{
    foreignKey: "idUser",
    target: "idUser"
});

Manager.belongsTo(User, 
{
    foreignKey: "idUser",
    target: "idUser"
});

User.hasOne(Session, 
{
    foreignKey: "idUser",
    sourceKey: "idUser"
});

Session.belongsTo(User,
{
    foreignKey: "idUser",
    targetKey: "idUser"
});