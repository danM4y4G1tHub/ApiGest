import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Order = sequelize.define("Oder", 
{
    cantProduct: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    dateOrder: {
        type: DataTypes.DATE,
        allowNull: true
    }
}
);