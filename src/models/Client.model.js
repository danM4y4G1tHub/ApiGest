import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Order } from "./Order.model.js";

import pkg from 'bcrypt';
const { bcrypt } = pkg;

export const Client = sequelize.define("Client", 
{
    idClient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    registred: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
},
{
    hooks: {
        beforeCreate: async (email) => {
            if(email.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(email.password, salt); 
            }
        },
        beforeUpdate: async (email) => {
            if(email.password){
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(email.password, salt);
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

Client.hasMany(Order, 
{
    foreignKey: "idClient",
    sourceKey: "idClient"
});

Order.belongsTo(Client,
{
    foreignKey: "idClient",
    targetKey: "idClient"
});