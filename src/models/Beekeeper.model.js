import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { ProductModel } from "./Product.model.js";
import { ProblemModel } from "./Problem.model.js";

import bcrypt from "bcrypt";

export const BeekeeperModel = sequelize.define(
  "Beekeeper",
  {
    idBK: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

BeekeeperModel.beforeCreate(async (bee) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(bee.password, saltRounds);
  bee.password = hashedPassword;
});

BeekeeperModel.belongsToMany(ProductModel, {
  through: "BeekeeperProduct",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "idBK",
  timestamps: false,
});
ProductModel.belongsToMany(BeekeeperModel, {
  through: "BeekeeperProduct",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "idProd",
});

BeekeeperModel.hasMany(ProblemModel, {
  foreignKey: "idBK",
  sourceKey: "idBK",
});

ProblemModel.belongsTo(BeekeeperModel, {
  foreignKey: "idBK",
  targetKey: "idBK",
});
