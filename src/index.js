import app from "./app/app.js";
import { sequelize } from "./database/database.js";

const PORT = process.env.PORT || 3001;

async function main(){
    try {
        await sequelize.sync();
        console.log("Conexión establecida con éxito 🦅");
        app.listen(PORT, () => console.log("Servidor ejecutado con exito 🦉 http://localhost:3001 " + PORT));
    } catch (error) {
        console.error("Conexión fallida 😢", error);
    }
}

main();