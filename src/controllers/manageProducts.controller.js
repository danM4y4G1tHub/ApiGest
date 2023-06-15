import {
  agregateProduct,
  existBeekeeper,
  productsBeekeeper,
  deleteAllProductsBeekeeper,
  getIdBK,
} from "../services/Beekeeper.service.js";

import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../services/Product.service.js";

export const registerProduct = async (req, res) => {
  try {
    const { nameProd, price, capacity, lot, enable } = req.body;
    const idUser = req.uid;

    if (await existBeekeeper(idUser)) {
      const product = await createProduct(
        nameProd,
        price,
        capacity,
        lot,
        enable
      );
      await agregateProduct(idUser, product);
      const id = await getIdBK(idUser);
      res.status(201).json(await productsBeekeeper(id.idBK));
    } else {
      throw new Error("No tiene permiso para agregar productos.");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const giveProduct = async (req, res) => {
  try {
    const { idProd } = req.params;
    const idBK = req.uid;
    if (await existBeekeeper(idBK)) {
      res.status(201).json(await getProduct(idProd));
    } else {
      throw new Error(
        "Usuario no válido, no tiene permiso para ver el producto."
      );
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const giveProducts = async (req, res) => {
  try {
    const idUser = req.uid;

    if (await existBeekeeper(idUser)) {
      const id = await getIdBK(idUser);
      if ((await productsBeekeeper(id.idBK)) === null) {
        res.status(205).json([]);
      } else {
        res.status(200).json(await productsBeekeeper(id.idBK));
      }
    } else {
      throw new Error(
        "Usuario no válido, no tiene permiso para ver los productos."
      );
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const modifyProduct = async (req, res) => {
  try {
    const { idProd, nameProd, price, capacity, lot, enable } = req.body;
    const idUser = req.uid;

    if (await existBeekeeper(idUser)) {
      const changed = await updateProduct(
        idProd,
        nameProd,
        price,
        capacity,
        lot,
        enable
      );

      if (!changed) {
        return res.status(404).json({ error: "No existe el producto." });
      } else {
        const idBK = await getIdBK(idUser);
        res.status(202).json(await productsBeekeeper(idBK));
      }
    } else {
      throw new Error(
        "Usuario no válido, no tiene permiso para modificar el producto."
      );
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { idProd } = req.params;
    const idUser = req.uid;

    if (await existBeekeeper(idUser)) {
      res.status(200).json(await deleteProduct(idProd));
    } else {
      throw new Error(
        "Usuario no válido, no tiene permiso para eliminar el producto."
      );
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const removeAllProducts = async (req, res) => {
  try {
    const idUser = req.uid;

    if (await existBeekeeper(idUser)) {
      const { idBK } = await getIdBK(idUser);
      await deleteAllProductsBeekeeper(idBK, req.body);

      res.status(204).json(await productsBeekeeper(idBK));
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
