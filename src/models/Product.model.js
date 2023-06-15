import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { SaleModel } from "./Sale.model.js";
import { OrderModel } from "./Order.model.js";

export const ProductModel = sequelize.define(
  "Product",
  {
    idProd: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
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
  },
  {
    timestamps: false,
  }
);

ProductModel.belongsToMany(SaleModel, {
  through: "ProductSale",
  foreignKey: "idProd",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  timestamps: false,
});
SaleModel.belongsToMany(ProductModel, {
  through: "ProductSale",
  foreignKey: "idSale",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});