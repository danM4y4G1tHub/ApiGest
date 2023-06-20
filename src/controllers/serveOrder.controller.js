import { getIdBK } from "../services/Beekeeper.service.js";
import { getInfoOrder, getOrdersF, removeOrder } from "../services/Order.service.js";
import { decreaseLot, getProduct } from "../services/Product.service.js";
import { createSale } from "../services/Sale.service.js";

// mostrarInfoPedido, confirmarPedidoAtendido, eliminarPedido
export const listOrders = async (req, res) => {
  try {
    const idUser = req.uid;
    const idBK = await getIdBK(idUser);
    const orders = await getOrdersF(idBK);

    res.json(orders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const showInfoOrder = async (req, res) => {
  try {
    const idUser = req.uid;
    const idBK = await getIdBK(idUser);
    const { idOrd, idProd, lotOrd } = await getInfoOrder(idOrd, idBK);
    const { nameProd } = await getProduct(idProd);

    res.status(200).json({ nameProd, lotOrd });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const serveOrder = async (req, res) => {
  try {
    const idUser = req.uid;
    const { lotProd, product } = req.body;
    const idBK = await getIdBK(idUser);
    await removeOrder(idBK);
    await createSale(lotProd, product);
    if (await decreaseLot(idProd, lotProd)) {
      res.status(200).json({ message: "Venta realizada con éxito." });
    } else {
      res.status(404).json({ messaje: "Ha ocurrido un error." });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
