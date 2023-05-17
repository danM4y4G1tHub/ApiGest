import { Router } from "express";
import { solicitudeValidator } from "../middlewares/applyValidator.js";
import { validationResultExpress } from "../middlewares/validationResultsExpress.js";
import { registerSolicitude } from "../controllers/applyIncorporation.controller.js";

const router = Router();

router.get("/", (req, res) => { return res.render("s") });
router.post("/", (req, res) => { res.json(req.body) });
router.post("/apply", solicitudeValidator, validationResultExpress, registerSolicitude);

export default router;