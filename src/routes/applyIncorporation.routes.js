import { Router } from "express";
import { solicitudeValidator } from "../middlewares/applyValidator.js";
import { validationResultExpress } from "../middlewares/validationResultsExpress.js";
import {
  checkCI,
  checkToken,
  giveApplicants,
  registerSolicitude,
  changeState
} from "../controllers/applyIncorporation.controller.js";

const router = Router();

router
  .post(
    "/apply",
    solicitudeValidator,
    validationResultExpress,
    registerSolicitude
  )
  .get("/requesters", giveApplicants)
  .get("/state/token/:token", checkToken)
  .get("/state/cell/:ciApplic", checkCI)
  .patch("/state/change/:idApplic/:state", changeState)

export default router;
