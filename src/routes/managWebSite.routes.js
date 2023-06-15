import { Router } from "express";
import { listUsers } from "../controllers/manageWebSite.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/list-users", requireToken, listUsers);

export default router;
