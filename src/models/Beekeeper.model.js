import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { ProductModel } from "./Product.model.js";
import { ProblemModel } from "./Problem.model.js";

import pkg from "bcrypt";
const { bcrypt } = pkg;

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
  },
  {
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      },
    },
  }
);

BeekeeperModel.hasMany(ProductModel, {
  foreignKey: "idBK",
  sourceKey: "idBK",
});

ProductModel.belongsTo(BeekeeperModel, {
  foreignKey: "idBK",
  targetKey: "idBK",
});

BeekeeperModel.hasMany(ProblemModel, {
  foreignKey: "idBK",
  sourceKey: "idBK",
});

ProblemModel.belongsTo(BeekeeperModel, {
  foreignKey: "idBK",
  targetKey: "idBK",
});
