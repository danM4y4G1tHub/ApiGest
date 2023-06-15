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

    return newProd.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (idProd) => {
  try {
    const product = await ProductModel.findByPk(idProd, {
      attributes: ["idProd", "nameProd", "price", "capacity", "lot"],
    });

    return product.dataValues;
  } catch (error) {
    if (error.TypeError == "Cannot read properties of null (reading 'idProd')")
      return res
        .status(500)
        .json({ message: "Error identificador no válido." });
  }
};

export const getAllsByProduct = async (nameProd) => {
  try {
    const products = await ProductModel.findAll({
      where: {
        nameProd,
      },
    });
    return products;
  } catch (error) {
    if (
      error.TypeError == "Cannot read properties of null (reading 'nameProd')"
    )
      return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (
  idProd,
  nameProd,
  price,
  capacity,
  lot,
  enable
) => {
  try {
    const product = await ProductModel.findByPk(idProd);
    console.log(product.dataValues);

    if (!product) return null;

    const fields = dirtyChecking(
      product,
      nameProd,
      price,
      capacity,
      lot,
      enable
    );

    if (!fields) return null;

    if (fields[0]) {
      product.nameProd = nameProd;
    }
    if (fields[1]) {
      product.price = price;
    }
    if (fields[2]) {
      product.capacity = capacity;
    }
    if (fields[3]) {
      product.lot = lot;
    }
    if (fields[4]) {
      product.enable = enable;
    }

    await product.save();

    return product.dataValues;
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const dirtyChecking = (product, nameProd, price, capacity, lot, enable) => {
  try {
    let isNameProdDirty = false;
    let isPriceDirty = false;
    let isCapacityDirty = false;
    let isLotDirty = false;
    let isEnableDirty = false;

    if (!product) {
      throw new Error("No existe el producto a modificar");
    } else {
      if (product.nameProd !== nameProd) {
        isNameProdDirty = true;
      }
      if (product.price !== price) {
        isPriceDirty = true;
      }
      if (product.capacity !== capacity) {
        isCapacityDirty = true;
      }
      if (product.lot !== lot) {
        isLotDirty = true;
      }
      if (product.enable !== enable) {
        isEnableDirty = true;
      }
    }

    const updatedFields = [];

    updatedFields.push(isNameProdDirty);
    updatedFields.push(isPriceDirty);
    updatedFields.push(isCapacityDirty);
    updatedFields.push(isLotDirty);
    updatedFields.push(isEnableDirty);
    console.log(updatedFields)
    return updatedFields;
  } catch (error) {
    console.log(error.message);
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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
