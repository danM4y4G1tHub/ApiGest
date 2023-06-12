import { Router } from "express";
import { solicitudeValidator } from "../middlewares/applyValidator.js";
import { validationResultExpress } from "../middlewares/validationResultsExpress.js";

import {
  checkCI,
  checkToken,
  registerSolicitude,
} from "../controllers/applyIncorporation.controller.js";

import { listApplicants, processCertificates } from "../controllers/manageWebSite.controller.js";

const router = Router();

router
  .post(
    "/apply",
    solicitudeValidator,
    validationResultExpress,
    registerSolicitude
  )
  .get("/state/token/:token", checkToken)
  .get("/state/cell/:ciApplic", checkCI)
  .get("/applicants/:rol", listApplicants)
  .post("/state/change", processCertificates)

export default router;
