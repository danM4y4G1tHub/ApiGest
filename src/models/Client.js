import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { bcrypt } from "bcrypt";

export const Client = sequelize.define("Client", 
{
    email: {
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