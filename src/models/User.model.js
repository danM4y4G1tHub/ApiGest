import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { ApplicantModel } from "./Applicant.model.js";
import { BeekeeperModel } from "./Beekeeper.model.js";
import { ClientModel } from "./Client.model.js";
import { ManagerModel } from "./Manager.model.js";
import { SessionModel } from "./Session.model.js";
import { DeviceModel } from "./Device.model.js";

export const UserModel = sequelize.define(
  "User",
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameApplic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastNameApplic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ciApplic: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    certificApplic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    telefApplic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailApplic: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    provApplic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    munApplic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    direction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    tokenConfirm: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    accountConfirm: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

ApplicantModel.belongsTo(UserModel, {
  foreignKey: "idUser",
  target: "idUser",
});

BeekeeperModel.belongsTo(UserModel, {
  foreignKey: "idUser",
  target: "idUser",
});

ClientModel.belongsTo(UserModel, {
  foreignKey: "idUser",
  target: "idUser",
});

ManagerModel.belongsTo(UserModel, {
  foreignKey: "idUser",
  target: "idUser",
});

UserModel.hasOne(SessionModel, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});

SessionModel.belongsTo(UserModel, {
  foreignKey: "idUser",
  targetKey: "idUser",
});

UserModel.hasMany(DeviceModel, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});

DeviceModel.belongsTo(UserModel, {
  foreignKey: "idUser",
  targetKey: "idUser",
});
