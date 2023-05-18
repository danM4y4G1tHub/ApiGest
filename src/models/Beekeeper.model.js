import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { ProductModel } from "./Product.model.js";
import { ProblemModel } from "./Problem.model.js";

import pkg, { hash } from "bcrypt";
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

BeekeeperModel.belongsToMany(ProductModel, {through: "BeekeeperProduct", timestamps: false});
ProductModel.belongsTo(BeekeeperModel, {through: "BeekeeperProduct"});

BeekeeperModel.hasMany(ProblemModel, {
  foreignKey: "idBK",
  sourceKey: "idBK",
});

ProblemModel.belongsTo(BeekeeperModel, {
  foreignKey: "idBK",
  targetKey: "idBK",
});

BeekeeperModel.prototype.validPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};
