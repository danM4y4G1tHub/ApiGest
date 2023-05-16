import { Router } from "express";
import { solicitudeValidator } from "../middlewares/applyValidator.js";
// import { validationResultExpress } from "../middlewares/validationResultsExpress.js";

const router = Router();

router.post("/apply", solicitudeValidator);
router.get("/state:token");
router.get("/state:ci");

export default router;