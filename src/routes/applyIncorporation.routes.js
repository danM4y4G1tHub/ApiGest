import { Router } from "express";
import { solicitudeValidator } from "../middlewares/applyValidator.js";
import { validationResultExpress } from "../middlewares/validationResultsExpress.js";
import { registerSolicitude } from "../controllers/applyIncorporation.controller.js";

const router = Router();

router.post("/apply", solicitudeValidator, validationResultExpress, registerSolicitude);

export default router;