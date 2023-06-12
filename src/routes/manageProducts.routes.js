import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";
import {
  giveProduct,
  giveProducts,
  modifyProduct,
  registerProduct,
  removeProduct,
  removeAllProducts
} from "../controllers/manageProducts.controller.js";

const router = Router();

router
  .post("/aggregate", requireToken, registerProduct)
  .get("/product/:idProd", requireToken, giveProduct)
  .get("/products", requireToken, giveProducts)
  .post("/modify", requireToken, modifyProduct)
  .delete("/delete/:idProd", requireToken, removeProduct)
  .post("/deleteAlls", requireToken, removeAllProducts)

//       .post("/salemonth", requireToken, giveSaleMonth)
//       .post("/saleannual", requireToken, giveSalesAnnaul)

export default router;
