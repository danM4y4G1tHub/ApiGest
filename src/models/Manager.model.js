import  { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../database/database.js";

import pkg from 'bcrypt';
const { bcrypt } = pkg;

export const Manager = sequelize.define("Manager", 
{
    idMgr: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ciMgr: {
        type: DataTypes.STRING,
        allowNull: true
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
});