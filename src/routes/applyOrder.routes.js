import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";
import {
  addKart,
  cancelOrder,
  changeLotOrder,
  clientRegistered,
  infoOffert,
  listOffers,
  showKart,
} from "../controllers/applyOrder.js";

const router = Router();

router
  .post("/offers", listOffers) //Ofertas
  .post("/info-offer", infoOffert) //Datos del producto y el apicultor
  .post("/add-order/kart", requireToken, addKart) //Producto agregado al carrito
  .get("/list-orders/kart", requireToken, showKart) //Lista de productos del carrito
  .put("/modify-order/:lotProd", requireToken, changeLotOrder)
  .delete("/cancel-order/:idOrd", requireToken, cancelOrder) //Producto cancelado
  .post("/cancel-orders", requireToken) //Productos cancelados
  .post("/buy-product", requireToken, clientRegistered); //Realizar compra

export default router;
