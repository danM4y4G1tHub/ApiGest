import { BeekeeperModel } from "../models/Beekeeper.model.js";
import { ProductModel } from "../models/Product.model.js";

export const createProduct = async (nameProd, price, capacity, lot, enable) => {
  try {
    const newProd = await ProductModel.create({
      nameProd,
      price,
      capacity,
      lot,
      enable,
    });

    return newProd;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (idProd) => {
  try {
    await ProductModel.destroy({
      where: {
        idProd,
      },
    });

    return json({ message: "Producto eliminado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setNameProduct = async (idProd, nameProd) => {
  try {
    await ProductModel.update(nameProd, {
      where: {
        idProd,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setPrice = async (idProd, price) => {
  try {
    await ProductModel.update(price, {
      where: {
        idProd,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setCapacity = async (idProd, capacity) => {
  try {
    await ProductModel.update(capacity, {
      where: {
        idProd,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setLot = async (idProd, lot) => {
  try {
    await ProductModel.update(lot, {
      where: {
        idProd,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllsByProduct = async (nameProd) => {
  try {
    return ProductModel.findAll({
      where: {
        nameProd,
      },
    })
      .then((product) => {
        return BeekeeperModel.findAll({
          attributes: ["nameBK"],
          include: [
            {
              model: ProductModel,
              attributes: ["idProd", "price", "capacity", "lot"],
              where: { idProd: product.idProd, enable: true },
            },
          ],
        });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
