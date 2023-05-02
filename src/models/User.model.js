import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Applicant } from "./Applicant.model.js";
import { BeekeeperModel } from "./Beekeeper.model.js";
import { Client } from "./Client.model.js";
import { Manager } from "./Manager.model.js";
import { Session } from "./Session.model.js";

export const UserModel = sequelize.define("User", {
  idUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

Applicant.belongsTo(UserModel, {
  foreignKey: "idUser",
  target: "idUser",
});

BeekeeperModel.belongsTo(UserModel, {
  foreignKey: "idUser",
  target: "idUser",
});

Client.belongsTo(UserModel, {
  foreignKey: "idUser",
  target: "idUser",
});

Manager.belongsTo(UserModel, {
  foreignKey: "idUser",
  target: "idUser",
});

UserModel.hasOne(Session, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});

Session.belongsTo(UserModel, {
  foreignKey: "idUser",
  targetKey: "idUser",
});