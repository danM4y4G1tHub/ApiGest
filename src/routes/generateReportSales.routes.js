import { Router } from "express";
import { listMonthSales } from "../controllers/genearateReportSales.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/sales-month", requireToken, listMonthSales);

export default router;