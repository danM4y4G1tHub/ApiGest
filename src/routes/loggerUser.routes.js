import { Router } from "express";
import {
  guestUser,
  changePasswordUser,
  authUser,
  giveUsers,
  registerClient,
  registerBeeKeeper,
} from "../controllers/loggerUser.controller.js";

import {
  registerValidator,
  loginValidator,
} from "../middlewares/authValidator.js";
import { validationResultExpress } from "../middlewares/validationResultsExpress.js";

const router = Router();

//Use Case: Loggear Usuario
router
  .post("/guest", guestUser)
  .post("/register/beekeeper", registerValidator, validationResultExpress, registerBeeKeeper)
  .post("/register/client", registerValidator, validationResultExpress, registerClient)
  .post("/login", loginValidator, validationResultExpress, authUser)
  .post(
    "/profile",
    loginValidator,
    validationResultExpress,
    changePasswordUser
  )
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
