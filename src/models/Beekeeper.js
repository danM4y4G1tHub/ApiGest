import  { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { bcrypt } from "bcrypt";
import { Problem } from "../models/Problem.js";

export const Beekeeper = sequelize.define("Beekeeper", 
{
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

Beekeeper.hasMany(Problem);
Problem.belongsTo(Beekeeper);