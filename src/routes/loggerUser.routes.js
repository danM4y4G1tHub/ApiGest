import { Router } from "express";
import {
  registerGuest,
  registerClient,
  registerBeeKeeper,
  authBeekeeper,
  authClient,
  changePasswordBeekeeper,
  giveUsers,
} from "../controllers/loggerUser.controller.js";

import {
  registerValidatorClient,
  registerValidatorBeekeeper,
  loginValidatorClient,
  loginValidatorBeekeeper,
  changeValidatorClient,
  changeValidatorBeekeeper,
} from "../middlewares/authValidator.js";
import { validationResultExpress } from "../middlewares/validationResultsExpress.js";

const router = Router();

//Use Case: Loggear Usuario
router
  .post("/guest", registerGuest)
  .post(
    "/register/beekeeper",
    registerValidatorBeekeeper,
    validationResultExpress,
    registerBeeKeeper
  )
  .post(
    "/register/client",
    registerValidatorClient,
    validationResultExpress,
    registerClient
  )
  .post(
    "/login/beekeeper",
    loginValidatorBeekeeper,
    validationResultExpress,
    authBeekeeper
  )
  .post(
    "/login/client",
    loginValidatorClient,
    validationResultExpress,
    authClient
  )
  // .post("/login/manager", loginValidator, validationResultExpress, authMenager)
  .post(
    "/profile/beekeeper",
    changeValidatorBeekeeper,
    validationResultExpress,
    changePasswordBeekeeper
  )
  // .post(
  //   "/profile/client",
  //   changeValidatorClient,
  //   validationResultExpress,
  //   changePasswordClient
  // )
  // .post(
  //   "/profile/manger",
  //   loginValidator,
  //   validationResultExpress,
  //   changePasswordManager
  // )
  .get("/users", giveUsers);

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
