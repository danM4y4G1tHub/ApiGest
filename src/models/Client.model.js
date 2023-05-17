import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { OrderModel } from "./Order.model.js";

import pkg, { hash } from "bcrypt";
const { bcrypt } = pkg;

export const ClientModel = sequelize.define(
  "Client",
  {
    idClient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    registred: {
      type: DataTypes.BOOLEAN,
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

ClientModel.hasMany(OrderModel, {
  foreignKey: "idClient",
  sourceKey: "idClient",
});

OrderModel.belongsTo(ClientModel, {
  foreignKey: "idClient",
  targetKey: "idClient",
});

ClientModel.prototype.validPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};
