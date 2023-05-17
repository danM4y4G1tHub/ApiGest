import express from "express";
import loggerUser from "../routes/loggerUser.routes.js";
import solicitudeApply from "../routes/applyIncorporation.routes.js";

const app = express();

//Middlewares
app.use(express.json());
app.use("/api/v1/auth", loggerUser)
app.use("/api/v1/auth", loggerUser);
app.use("/api/v1/solicitude", solicitudeApply);
// app.use(express.static("public"));

export default app;