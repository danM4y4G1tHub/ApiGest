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
  },
  {
    timestamps: false,
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      },
    },
  }
);

ManagerModel.prototype.validPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};
