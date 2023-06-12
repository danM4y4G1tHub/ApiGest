import express from "express";
import cookieParser from "cookie-parser";
// import cors from "cors";

import loggerUser from "../routes/loggerUser.routes.js";
import manageProducts from "../routes/manageProducts.routes.js";
import solicitudeApply from "../routes/applyIncorporation.routes.js";

const app = express();

// const liveServer = "http://127.0.0.1:5500";
// const whiteList = [liveServer];

// app.use(cors({
//     // origin: function(origin, callback){
//     //     if(whiteList.includes(origin)){
//     //         return callback(null, origin);
//     //     }
//     //     return callback(`Error de CORS origen: ${origin} no autorizado`);
//     // }
// }));

//Middlewares para recibir informacion del navegador
app.use(express.json());
app.use(cookieParser());

//Middlewares End-Points para consumir de la API Rest
app.use("/api/v1/solicitude", solicitudeApply);
app.use("/api/v1/auth", loggerUser);
app.use("/api/v1/productMgr", manageProducts);

export default app;
