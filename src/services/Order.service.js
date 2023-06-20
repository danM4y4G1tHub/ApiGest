import { Op } from "sequelize";
import { sequelize } from "../database/database.js";
import { OrderModel } from "../models/Order.model.js";
import { TempOrderModel } from "../models/tempOrder.model.js";
// Temporals Orders{
export const createOrderTemp = async (order, idClient) => {
  try {
    const tempOrder = [];
    let data = 0;
    const i = 0;
    for (const ord of order) {
      data = await TempOrderModel.create({
        lotProd: ord.lotProd,
        dateOrd: new Date(),
        idProd: ord.idProd,
        idBK: ord.idBK,
        idClient,
      });
      tempOrder.push(await data.get());
    }

    return tempOrder;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const modifyOrderTemp = async (idOrd, lotProd) => {
  try {
    await TempOrderModel.update(lotProd, { where: { idOrd } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const transferOrderTemp = async () => {
  try {
    const data = await TempOrderModel.findAll({
      where: {
        dateOrd: {
          [Op.gte]: sequelize.literal("DATE_SUB(NOW(), INTERVAL 24 HOUR)"),
        },
      },
      raw: true,
    });

    for (const ord of data) {
      await OrderModel.create({
        lotProd: ord.lotProd,
        dateOrd: ord.dateOrd,
        idClient: ord.idClient,
        idProd: ord.idProd,
        idBK: ord.idBK,
      });
    }

    await cleanTempOrders(data);

    return true;
  } catch (error) {}
  return res.status(500).json({ message: error.message });
};
const cleanTempOrders = async (data) => {
  try {
    for (const ord of data) {
      await TempOrderModel.destroy({
        where: {
          idOrd: ord.idOrd,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const onTimeUser = async (idOrd, idUser) => {
  try {
    const time = await OrderModel.findOne({
      where: idOrd,
      idUser,
      dateOrd: {
        [Op.gte]: sequelize.literal("DATE_SUB(NOW(), INTERVAL 24 HOUR)"),
      },
    });
    if (time !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const onTimeClient = async (idOrd, idClient) => {
  try {
    const time = await OrderModel.findOne({
      where: idOrd,
      idClient,
      dateOrd: {
        [Op.gte]: sequelize.literal("DATE_SUB(NOW(), INTERVAL 24 HOUR)"),
      },
    });

    if (time !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const deleteOrderTemp = async (idOrd, idClient) => {
  try {
    await TempOrderModel.destroy({ where: { idOrd, idClient } });

    return true;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const deleteOrders = async (idOrds, idClient) => {
  try {
    const Orders = await TempOrderModel.findOne({ where: { idClient } });

    for (const idP of idOrds) {
      Orders.destroy({ where: { idP } });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// }
  
export const getOrder = async (idOrd, idClient) => {
  try {
    const order = await OrderModel.findOne({ where: { idOrd, idClient } });

    return order.dataValues;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getOrdersF = async (idBK) => {
  try {
    const orders = await OrderModel.findAll({
      where: { idBK },
      attributes: ["idOrd", "idClient"],
    });

    return orders;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const removeOrder = async (idBK) => {
  try {
    const Order = await OrderModel.findAll({
      where: { idBK },
      attributes: ["idOrd"],
    });

    for (ord of Order) {
      Order.destroy({
        where: {
          ord,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getInfoOrder = async (idOrd, idBK) => {
  try {
    const info = await OrderModel.findByPk(idOrd, { where: { idBK } });

    return info;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
