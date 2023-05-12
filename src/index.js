import express from "express";
import { engine } from "express-handlebars";
import { sequelize } from "./database/database.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// -----view engine----
app.engine(".hbs", engine({
    extname: ".hbs"
}));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
 
app.get("/", (req, res) => {
    res.render("home", {titulo: "Pagina de inicio"});
});
// -----/view engine----

app.use(express.json());
app.use(express.static(__dirname + "/public/templateEngine"));

async function main(){
    try {
        await sequelize.sync();
        console.log("Conexión establecida con éxito 🦅");
        app.listen(3000, () => console.log("Servidor ejecutado con exito 🦉"));
    } catch (error) {
        console.error("Conexión fallida 😢", error);
    }
}

main();