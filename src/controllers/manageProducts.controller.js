import { getBeekeeper } from "../services/Beekeeper.service.js";
import { createProduct } from "../services/Product.service.js";

import { createProblem, getProblem } from "../services/Problem.service.js";

import {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrders,
} from "../services/Order.service.js";

import {
  createSale,
  getSale,
  updateSale,
  deleteSale,
  getSales,
} from "../services/Sale.service.js";
import { where } from "sequelize";
import { BeekeeperModel } from "../models/Beekeeper.model.js";

export const registerProduct = async (req, res) => {
  try {
    const { nameProd, price, capacity, lot, enable } = req.body;
    const idBK = req.uid;
    let BK = await getBeekeeper(idBK);
    const product = await createProduct(nameProd, price, capacity, lot, enable);
    console.log(BK);
    BK.addProducts([product]);
    // res.status(201).json(await BK.getProducts());
    res.json({ ok: true });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const giveProduct = async (req, res) => {
  try {
    const { idProd } = req.params;
    const idBK = req.uid;
    const BK = await getBeekeeper(idBK);
    const product = await BK.getProduct({ where: idProd });

    if (!product) {
      return res.status(401).json({ error: "No le pertenece ese id" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const giveProducts = async (req, res) => {
  try {
    const idBK = req.uid;
    const BK = await getBeekeeper(idBK);
    res.status(200).json(await BK.getProducts());
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
//llenarTablaProductos
//verificarProductoAAgregar, cargarPaginaAdicionarProducto, validarDatosProducto, confirmarProductoAAgragar, crearProducto, actualizarTabla
//verificarProductoAActualizar, cargarPaginaModificarProducto, validarDatosProducto, confirmarProductoA, actualizarProducto, actualizarTabla
//verificarProductoAEliminar, confirmarProductoAEliminar, eliminarProducto, actualizarTabla

//cargarVentasMes, confirmarPDF, crearPDF
//cargarVentasAnual, confirmarPDF, crearPDF

//validarDatosProblema, confirmarEnviaProblema, agregarProblema, enviarProblema
