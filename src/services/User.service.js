import { UserModel } from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const createUser = async (
  nameApplic,
  lastNameApplic,
  ciApplic,
  certificApplic,
  telefApplic,
  emailApplic,
  provApplic,
  munApplic,
  direction,
  state,
  rol,
  tokenConfirm,
  accountConfirm
) => {
  try {
    const newUser = await UserModel.create({
      nameApplic,
      lastNameApplic,
      ciApplic,
      certificApplic,
      telefApplic,
      emailApplic,
      provApplic,
      munApplic,
      direction,
      state,
      rol,
      active: true,
      tokenConfirm,
      accountConfirm,
    });
    return newUser.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (idUser) => {
  try {
    const user = await UserModel.findByPk(idUser);
    const token = jwt.sign({ uid: UserModel.idUser }, "Sf1KxwRJSMeKKF2QT4fwp");
    return token;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async () => {
  try {
    const allUsers = await UserModel.findAll();
    return allUsers;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (idUser) => {
  try {
    await UserModel.destroy({
      where: {
        idUser,
      },
    });
    res.status(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRol = async (idUser) => {
  try {
    const rol = await UserModel.findByPk(idUser);
    return rol;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setRol = async (idUser, rol) => {
  try {
    await UserModel.update(
      { rol },
      {
        where: {
          idUser,
        },
      }
    );
    res.status(200).json({ msg: "Rol actualizado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const isActive = async (idUser) => {
  try {
    const active = await UserModel.findByPk(idUser);
    return active;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setActive = async (idUser, active) => {
  try {
    await UserModel.update(
      { active },
      {
        where: {
          idUser,
        },
      }
    );
    res.status(200).json({ msg: "Active actualizado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAccountConfirm = async (idUser) => {
  try {
    const confirmed = await UserModel.findByPk(idUser);
    return confirmed;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setAccountConfirm = async (idUser, accountConfirm) => {
  try {
    await UserModel.update(accountConfirm, {
      where: {
        idUser,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const existEmail = async (emailApplic) => {
  try {
    const exist = await UserModel.findOne({
      where: {
        emailApplic,
      },
    });

    if (exist) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
