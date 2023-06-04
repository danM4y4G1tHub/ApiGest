import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { giveProduct, giveProducts, registerProduct } from "../controllers/manageProducts.controller.js";

 const router = Router();

//Use Case: Gestionar Productos

router.get("/product/:id", requireToken, giveProduct)
      .get("/products", requireToken, giveProducts)
      .post("/aggregate", requireToken, registerProduct)
//       .patch("/modify"/:idProd/:nameProd/:price/:capacity/:lot/:enable, requireToken, changeProduct)
//       .delete("/delete", requireToken, destroyProduct)
//       .post("/salemonth", requireToken, giveSaleMonth)
//       .post("/saleannual", requireToken, giveSalesAnnaul)

 export default router;