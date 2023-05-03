import express from "express";
import { create } from "express-handlebars";
// import userRoutes from "../routes/user.routes.js";

const app = express();

const hbs = create({
    extname: ".hbs",
});

//Middlewares

//Configuracion del motor de plantillas
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "../views");

// app.use(userRoutes);

app.get("/", (req, res) => {
    res.render("home");
});

app.use(express.json());
app.use(express.static("/public/templateEngine"));

export default app;