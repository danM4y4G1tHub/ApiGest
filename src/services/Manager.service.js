import { ManagerModel } from "../models/Manager.model.js";
import bcrypt from "bcrypt";

export const createManager = async (ciMgr, user, password, idUser) => {
  try {
    const Mgr = await ManagerModel.create({
      ciMgr,
      user,
      password,
      lastChange: new Date(),
      idUser,
    });

    return Mgr.dataValues;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getManager = async (idUser) => {
  try {
    const Mgr = await ManagerModel.findOne({
      where: { idUser },
      attributes: ["user"],
    });

    return Mgr.dataValues;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserManager = async (user) => {
  try {
    const Mgr = ManagerModel.findOne({
      where: {
        user,
      },
      attributes: ["user", "idUser"],
    });

    if (!Mgr) return null;

    return Mgr;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPasswordManager = async (user, password) => {
  try {
    const pass = await ManagerModel.findOne({
      where: {
        user,
      },
      attributes: ["password"],
    });

    const match = await bcrypt.compare(password, pass.password);

    if (match) return true;

    return false;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
