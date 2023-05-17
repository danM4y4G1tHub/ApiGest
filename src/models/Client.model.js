import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { OrderModel } from "./Order.model.js";

import pkg from "bcrypt";
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
    hooks: {
      beforeCreate: async (email) => {
        if (email.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.password = bcrypt.hashSync(email.password, salt);
        }
      },
      beforeUpdate: async (email) => {
        if (email.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.password = bcrypt.hashSync(email.password, salt);
        }
      },
    },
  },
  {
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
