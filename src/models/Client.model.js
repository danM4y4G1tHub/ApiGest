import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { OrderModel } from "./Order.model.js";

import bcrypt from "bcrypt";
import { TempOrderModel } from "./tempOrder.model.js";

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
    lastChange: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false,
  }
);

ClientModel.beforeCreate(async (client) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(client.password, saltRounds);
  client.password = hashedPassword;
});

ClientModel.hasMany(OrderModel, {
  foreignKey: "idClient",
  sourceKey: "idClient",
});
OrderModel.belongsTo(ClientModel, {
  foreignKey: "idClient",
  targetKey: "idClient",
});

ClientModel.hasMany(TempOrderModel, {
  foreignKey: "idClient",
  sourceKey: "idClient",
});
TempOrderModel.belongsTo(ClientModel, {
  foreignKey: "idClient",
  targetKey: "idClient",
});
