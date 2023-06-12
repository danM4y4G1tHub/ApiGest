import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router
.get("", ) //Ofertas
.get("", ) //Datos del producto y el apicultor
.post("", requireToken, ) //Producto agregado al carrito
.get("", requireToken, ) //Lista de productos del carrito
.delete("", requireToken, ) //Producto cancelado
.post("", requireToken, ) //Productos cancelados
.post("", requireToken, ) //Realizar compra

export default router;
