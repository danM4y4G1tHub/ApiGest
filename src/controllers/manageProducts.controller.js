import { getBeekeeper } from "../services/Beekeeper.js";
import {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProducts,
} from "../services/Product.js";

import { 
    createProblem,
    getProblem,
} from "../services/Problem.js";

import {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrders,
} from "../services/Order.js";

import {
    createSale,
    getSale,
    updateSale,
    deleteSale,
    getSales,
} from "../services/Sale.js";

//llenarTablaProductos
//verificarProductoAAgregar, cargarPaginaAdicionarProducto, validarDatosProducto, confirmarProductoAAgragar, crearProducto, actualizarTabla
//verificarProductoAActualizar, cargarPaginaModificarProducto, validarDatosProducto, confirmarProductoA, actualizarProducto, actualizarTabla
//verificarProductoAEliminar, confirmarProductoAEliminar, eliminarProducto, actualizarTabla

//cargarVentasMes, confirmarPDF, crearPDF
//cargarVentasAnual, confirmarPDF, crearPDF

//validarDatosProblema, confirmarEnviaProblema, agregarProblema, enviarProblema