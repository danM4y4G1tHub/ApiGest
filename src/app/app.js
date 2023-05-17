import express from "express";
import { engine } from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";

import applyRouter from "../routes/applyIncorporation.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// -----view engine----
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/../views");
// -----/view engine----

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/solicitude", applyRouter);
// app.use(applyRouter);

export default app;
