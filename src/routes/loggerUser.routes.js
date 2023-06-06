import { Router } from "express";
import {
  registerGuest,
  registerClient,
  registerBeeKeeper,
  authBeekeeper,
  authClient,
  changePasswordBeekeeper,
  giveUsers,
  refreshToken,
  logOut,
  confirmAcountBeekeeper,
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
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";

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
  .get("/confirm/:tokenConfirm", confirmAcountBeekeeper)
  .post(
    "/login/beekeeper",
    loginValidatorBeekeeper,
    validationResultExpress,
    authBeekeeper
  )
  .post(
    "/profile/beekeeper",
    changeValidatorBeekeeper,
    requireToken,
    validationResultExpress,
    changePasswordBeekeeper
  );

router
  .post(
    "/login/client",
    loginValidatorClient,
    validationResultExpress,
    authClient
  )
  // .post("/login/manager", loginValidator, validationResultExpress, authMenager)
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
  .get("/users", giveUsers)
  // .get("/protected", requireToken, infoUser)
  .get("/refresh", requireRefreshToken, refreshToken)
  .get("/logout", logOut)
  .get("/:id/:tokenConfirm");

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
