import { Router } from "express";
import {
  registerUser,
  guestUser,
  changePasswordUser,
  authUser
} from "../controllers/loggerUser.controller.js";

import {
  registerValidator,
  loginValidator,
} from "../middlewares/authValidator.js";
import { validationResultExpress } from "../middlewares/validationResultsExpress.js";

const router = Router();

//Use Case: Loggear Usuario
router.post("/guest", guestUser);
router.post(
  "/register",
  registerValidator,
  validationResultExpress,
  registerUser
); //funciona bien, recibe los campos y los valida

router.post("/login", loginValidator, validationResultExpress, authUser); //funciona bien, recibe los campos y los valida

router.post("/profile", loginValidator, validationResultExpress, changePasswordUser); //funciona bien, recibe los campos y los valida

//Use Case: Solicitar Pedidos
// router.post("/");
// router.post("/");
// router.post("/");
// router.post("/");

//Use Case: Atender Pedidos
// router.post("/");
// router.post("/");
// router.post("/");
// router.post("/");

//Use Case: Supervisar Sitio Web
// router.post("/");
// router.post("/");
// router.post("/");
// router.post("/");



export default router;
