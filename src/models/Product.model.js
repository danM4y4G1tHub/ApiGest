import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Sale } from "./Sale.model.js";

export const Product = sequelize.define("Product", 
{
    idProd: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameProd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    capacity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lot: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

Product.hasMany(Sale, {
    foreignKey: "idProd",
    sourceKey: "idProd"
});

Sale.belongsTo(Product, {
    foreignKey: "idProd",
    targetKey: "idProd"
});