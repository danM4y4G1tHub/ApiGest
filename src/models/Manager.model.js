import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../database/database.js";

import pkg, { hash } from "bcrypt";
const { bcrypt } = pkg;

export const ManagerModel = sequelize.define(
  "Manager",
  {
    idMgr: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ciMgr: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastChange: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false,
  },
);

ManagerModel.beforeCreate( async (mgr) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(mgr.password, saltRounds);
  mgr.password = hashedPassword;
});

ManagerModel.beforeUpdate( async (mgr) => {
  if(mgr.changed('password')){
    mgr.password = bcrypt.hashSync(mgr.password, 10);
  }
});