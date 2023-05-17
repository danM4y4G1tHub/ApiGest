import express from "express";
import { sequelize } from "./database/database.js";

const app = express();

app.use(express.json());

async function main(){
    try {
        await sequelize.sync({force: true});
        console.log("Conexión establecida con éxito 🦅");
        app.listen(3000, () => console.log("Servidor ejecutado con exito 🦉"));
    } catch (error) {
        console.error("Conexión fallida 😢", error);
    }
}

main();