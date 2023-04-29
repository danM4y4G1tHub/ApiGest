import express from "express";
// import userRoutes from "../routes/user.routes.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.static("public"));
// app.use(userRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app;