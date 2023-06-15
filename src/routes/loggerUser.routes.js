import { Router } from "express";
import {
  registerGuest,
  registerClient,
  registerBeeKeeper,
  authBeekeeper,
  authClient,
  authManager,
  changePasswordBeekeeper,
  registerManager,
  returnData,
  // logOut,
  // confirmAcountBeekeeper,
} from "../controllers/loggerUser.controller.js";

import {
  registerValidatorClient,
  registerValidatorBeekeeper,
  loginValidatorClient,
  loginValidatorBeekeeper,
  changeValidatorClient,
  changeValidatorBeekeeper,
  loginValidatorManager,
} from "../middlewares/authValidator.js";
import { validationResultExpress } from "../middlewares/validationResultsExpress.js";
import { requireToken } from "../middlewares/requireToken.js";
// import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";

const router = Router();

//Use Case: Loggear Usuario
router.post("/guest", registerGuest);

//Beekeeper
router
  .post(
    "/register/beekeeper",
    registerValidatorBeekeeper,
    validationResultExpress,
    registerBeeKeeper
  )
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

//Client
router
  .post(
    "/register/client",
    registerValidatorClient,
    validationResultExpress,
    registerClient
  )
  .post(
    "/login/client",
    loginValidatorClient,
    validationResultExpress,
    authClient
  );
// .post(
//   "/profile/client",
//   changeValidatorClient,
//   validationResultExpress,
//   changePasswordClient
// )
// .get("/confirm/:tokenConfirm", confirmAcountBeekeeper)

//Manager
router
  .get("/:id/:tokenConfirm")
  .post("/register/manager", registerManager)
  .post(
    "/login/manager",
    loginValidatorManager,
    validationResultExpress,
    authManager
  );
// .post(
//   "/profile/manager",
//   loginValidatorManager,
//   validationResultExpress,
//   changePasswordManager
// );

router.post("/is-user-auth", requireToken, returnData);

// .get("/lagout", logOut)
// .get("/refresh", requireRefreshToken, refreshToken)

export default router;
