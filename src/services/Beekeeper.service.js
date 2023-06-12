import { BeekeeperModel } from "../models/Beekeeper.model.js";
import { QueryTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import bcrypt from "bcrypt";

export const createBeekeeper = async (user, password, idUser) => {
  try {
    const newBK = await BeekeeperModel.create({
      user,
      password,
      lastChange: new Date(),
      idUser,
    });
    return newBK.idBK;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBeekeeper = async (idBK) => {
  try {
    const BK = await BeekeeperModel.findByPk(idBK);
    return BK.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserBeekeeper = async (user) => {
  try {
    const BK = await BeekeeperModel.findOne({
      where: { user },
      attributes: ["idBK"],
    });
    return BK.idBK;
  } catch (error) {
    if (error.TypeError == "Cannot read properties of null (reading 'idBK')")
      return res.status(500).json({ BK: null });
  }
};

export const existUser = async (user) => {
  try {
    const exist = await BeekeeperModel.findOne(
      { where: { user } },
      {
        attributes: ["user"],
      }
    );
    if (exist) return true;
    return false;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPasswordBeekeeper = async (user, password) => {
  try {
    const pass = await BeekeeperModel.findOne(
      {
        where: { user },
      },
      {
        attributes: ["password"],
      }
    );
    const match = await bcrypt.compare(password, pass.password);
    if (match) return true;
    return false;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const notifyBeekeeperPasswordChange = async () => {
  try {
    const threeMonths = 90 * 24 * 60 * 60 * 1000; //90 dias en milisegundos
    const test = 60 * 2;
    const now = new Date();
    const lastChange = new Date(
      BeekeeperModel.findAll({ attributes: ["lastChange"] })
    );

    for (user of lastChange) {
      if (now - user >= test) {
        const message =
          "Su contraseña ha expirado, debe cambiarla de inmediato para poder exceder.";
        return message;
        // await serviceNotification(); // aqui envio un mensaje a la seccion del usuario o un email al usuariocorespondiente
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const agregateProduct = async (idBK, product) => {
  try {
    const beeK = await BeekeeperModel.findByPk(idBK);
    await beeK.addProducts(product.idProd);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const productsBeekeeper = async (idBK) => {
  try {
    const productsBK = await sequelize.query(
      `SELECT 'Products'.idProd, nameProd, price, capacity, lot, enable
      FROM 'Products'
      INNER JOIN 'BeekeeperProduct' ON 'Products'.idProd = 'BeekeeperProduct'.idProd
      WHERE 'BeekeeperProduct'.idBK = ${idBK}`,
      { type: QueryTypes.SELECT }
    );
    return productsBK;
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Salto el catch de productsBeekeeper" });
  }
};

export const deleteAllProductsBeekeeper = async (idBK, idProds) => {
  try {
    const BeeK = await BeekeeperModel.findByPk(idBK);

    for (const idP of idProds) {
      BeeK.destroy({ where: { idP } });
    }
  } catch (error) {}
};

export const existBeekeeper = async (idBK) => {
  try {
    const exist = await BeekeeperModel.findByPk(idBK);

    if (exist) return true;

    return false;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBeekeeper = async (idBK) => {
  try {
    await BeekeeperModel.destroy({
      where: {
        idBK,
      },
    });
    return res.status().json({ msg: "Apicultor eliminado con éxito." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setPasswordBeekeeper = async (idBK, newPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    newPassword = hashedPassword;
    await BeekeeperModel.update(
      { password: newPassword },
      {
        where: {
          idBK,
        },
      }
    );

    BeekeeperModel.addHook("beforeSave", "updateLastChange", async (user) => {
      if (user.changed("password")) {
        user.lastChange = new Date();
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getIdBeekeepers = async (idUser) => {
  try {
    const idB = await BeekeeperModel.findOne({ where: { idUser } });
    return idB;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
