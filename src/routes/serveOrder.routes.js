import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { listOrders, serveOrder, showInfoOrder } from "../controllers/serveOrder.controller.js";

const router = Router();

router
  .get("/orders-list", requireToken, listOrders)
  .get("/order-client", requireToken, showInfoOrder)
  .delete("/order-delete", requireToken, serveOrder)

export default router;