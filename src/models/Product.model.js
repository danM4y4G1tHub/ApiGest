import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { SaleModel } from "./Sale.model.js";

export const ProductModel = sequelize.define("Product", {
  idProd: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nameProd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lot: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  enable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

ProductModel.hasMany(SaleModel, {
  foreignKey: "idProd",
  sourceKey: "idProd",
});

SaleModel.belongsTo(ProductModel, {
  foreignKey: "idProd",
  targetKey: "idProd",
});
