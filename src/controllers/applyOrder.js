import {
  getBeekeepersProduct,
  getIdBK,
} from "../services/Beekeeper.service.js";
import {
  createKart,
  getIdClient,
  getKart,
} from "../services/Client.service.js";
import {
  createOrderTemp,
  deleteOrder,
  deleteOrders,
  modifyOrderTemp,
  onTimeClient,
  onTimeUser,
} from "../services/Order.service.js";
import { getProduct } from "../services/Product.service.js";
import {
  getInfoBee,
  getRol,
  userProvinceMunicipality,
} from "../services/User.service.js";

export const listOffers = async (req, res) => {
  try {
    const { provApplic, munApplic, nameProd } = req.body;
    //Buscar todos los usuarios que sean de esa provincia y ese municipio
    const users = await userProvinceMunicipality(provApplic, munApplic);

    if (users === null) {
      return res
        .status(400)
        .json({ message: "No hay ofertas de este producto por el momento." });
    }

    //Buscar todos los apicultores que tengan esos ids y el nombre de ese producto
    const data = await getBeekeepersProduct(users, nameProd);

    if (data === null) {
      return res
        .status(404)
        .json({ message: "No hay ofertas de este producto por el momento." });
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const infoOffert = async (req, res) => {
  try {
    const { idProd, idUser } = req.body;
    const details = [];

    //Buscar el nombre, telefono, email, direccion, del , idBK
    details.push(await getInfoBee(idUser));
    const id = await getIdBK(idUser);
    details[0].idBK = id.idBK;

    //Buscar el nombre, precio, capacidad, cantidad del producto
    details.push(await getProduct(idProd));

    res.status(200).json(details);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const addKart = async (req, res) => {
  try {
    const {
      idProd,
      nameProd,
      price,
      capacity,
      lotProd,
      idBK,
      nameApplic,
      telefApplic,
      direction,
      emailApplic,
    } = req.body;

    const idUser = req.uid;

    const kart = await createKart(
      idProd,
      nameProd,
      price,
      capacity,
      lotProd,
      idBK,
      nameApplic,
      telefApplic,
      direction,
      emailApplic,
      idUser
    );
    res.status(201).json(kart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const showKart = async (req, res) => {
  try {
    const idUser = req.uid;
    const kart = await getKart(idUser);

    if (!kart) {
      return res.status(404).json({ error: "No existe este usuario." });
    } else {
      res
        .status(200)
        .json({ message: "Producto agregado al carrito de compras", kart });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const clientRegistered = async (req, res) => {
  try {
    const idClient = req.uid;
    const order = req.body;
    const { idUser } = await getIdUser(idClient);
    const { rol } = await getRol(idUser);

    if (rol === "Invitado") {
      return res
        .status(400)
        .json({ message: "Debe registrarse para poder realizar su compra." });
    } else {
      const orderTemp = await createOrderTemp(order, idClient);

      res.status(200).json({
        message:
          "Dispone de 24 horas para modificar su pedido o cancelarlo " +
          " y 3 días para recogerlo.",
        orderTemp,
      });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const registerOrder = async (req, res) => {
  try {
    if (await transferOrderTemp()) res.status(201).json({});
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const changeLotOrder = async (req, res) => {
  try {
    const { idOrd, lotProd } = req.body;
    const idUser = req.uid;
    const message = "El tiempo para modificar el pedido se ha terminado.";

    const { rol } = await getRol(idUser);
    if (rol === "Cliente") {
      const { idClient } = await getIdClient(idUser);
      if (!(await onTimeClient(idClient))) {
        return res.status(402).json({
          message,
        });
      } else {
        await modifyOrderTemp(idOrd, lotProd);
        const kart = await getKart(idUser);
        res.status(200).json(kart);
      }
    } else if (rol === "Invitado") {
      if (!(await onTimeUser(idUser))) {
        return res.status(402).json({
          message,
        });
      } else {
        await modifyOrderTemp(idOrd, lotProd);
        const kart = await getKart(idUser);
        res.status(200).json(kart);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { idOrd, lotProd } = req.body;
    const idUser = req.uid;
    const message = "El tiempo para cancelar el pedido se ha terminado.";

    const { rol } = await getRol(idUser);
    if (rol === "Cliente") {
      const { idClient } = await getIdClient(idUser);
      if (!(await onTimeClient(idClient))) {
        return res.status(402).json({
          message,
        });
      } else {
        await deleteOrder(idOrd, lotProd);
        const kart = await getKart(idUser);
        res.status(200).json(kart);
      }
    } else if (rol === "Invitado") {
      if (!(await onTimeUser(idUser))) {
        return res.status(402).json({
          message,
        });
      } else {
        await deleteOrder(idOrd, lotProd);
        const kart = await getKart(idUser);
        res.status(200).json(kart);
      }
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const cancelOrders = async (req, res) => {
  const { idOrds } = req.body;
  const idClient = req.uid;

  if (!(await onTime(idClient))) {
    return res.status(404).json({
      message: "El tiempo para cancelar el pedido se ha terminado.",
    });
  } else {
    const del = await deleteOrders(idOrds, idClient);
  }
};
//buscarUsuarioPedido, cargarPedidos, calcularImporte, modificarPedido, eliminarpedido, validarUsuarioRegistrado, aceptarPedido
//agregarPedido al apicultor
