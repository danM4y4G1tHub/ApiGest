import express from "express";
import loggerUser from "../routes/loggerUser.routes.js";
import manageProducts from "../routes/manageProducts.routes.js";
import solicitudeApply from "../routes/applyIncorporation.routes.js";
import cookieParser from "cookie-parser";

const app = express();

//Middlewares para recibir informacion del navegador
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Middlewares End-Points para consumir de la API Rest
app.use("/api/v1/auth", loggerUser);
app.use("/api/v1/solicitude", solicitudeApply);
app.use("/api/v1/productMgr", manageProducts);
app.use(express.static("public"));

export default app;
