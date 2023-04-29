import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Product } from "./Product.model.js";
import { Problem } from "./Problem.model.js";

import pkg from 'bcrypt';
const { bcrypt } = pkg;

export const Beekeeper = sequelize.define("Beekeeper", 
{
    idBK: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
{
    hooks: {
        beforeCreate: async (user) => {
            if(user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt); 
            }
        },
        beforeUpdate: async (user) => {
            if(user.password){
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    }
},
{
    instanceMethods: {
        validPassword: (password) => {
            return
            bcrypt.compareSync(password, this.password);
        }
    }
}
);

Beekeeper.hasMany(Product, 
{
    foreignKey: "idBK",
    sourceKey: "idBK"
});

Product.belongsTo(Beekeeper, 
{
    foreignKey: "idBK",
    targetKey: "idBK"
});

Beekeeper.hasMany(Problem, {
    foreignKey: "idBK",
    sourceKey: "idBK"
});

Problem.belongsTo(Beekeeper, {
    foreignKey: "idBK",
    targetKey: "idBK"
});