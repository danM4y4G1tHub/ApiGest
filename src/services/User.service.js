import { UserModel } from "../models/User.model.js";
import { nanoid } from "nanoid";

export const createUser = async (rol, active, accountConfirm) => {
  try {
    const newUser = await UserModel.create({
      rol,
      active,
      tokenConfirm: nanoid(8),
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
    return user.dataValues;
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
