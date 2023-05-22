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
    lastChange: {
      type: DataTypes.DATE,
      allowNull: false
    },
    registred: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

ClientModel.beforeCreate(async (client) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(bee.password, saltRounds);
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

ClientModel.prototype.validPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};
