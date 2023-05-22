import { createUser, getAllUsers, getRol } from "../services/User.service.js";
import {
  createBeekeeper,
  getPasswordBeekeeper,
  getUserBeekeeper,
  existUser,
  setPasswordBeekeeper,
} from "../services/Beekeeper.service.js";
import { createClient } from "../services/Client.service.js";
import { getApplicant } from "../services/Applicant.service.js";
import { createSession } from "../services/Session.service.js";
import { BeekeeperModel } from "../models/Beekeeper.model.js";

export const registerGuest = async (req, res) => {
  try {
    const { rol, accountConfirm } = req.body;
    const keyU = await createUser(rol, accountConfirm);
    const duration = 5;
    const timesConnected = 1;
    const session = await createSession(duration, timesConnected, keyU.idUser);
    res.status(201).json(keyU);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const registerClient = async (req, res) => {
  try {
    const { idUser, email, password } = req.body;
    // await getRol(idUser, rol);
    // res.status(201).json(await createClient(email, password, idUser));
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const registerBeeKeeper = async (req, res) => {
  try {
    const { idApplic, user, password } = req.body;
    res.status(201).json(await createBeekeeper(user, password, idApplic));
  } catch (error) {
    res.status(403).json({ message: error.message });
    // const keyA = await getApplicant(idApplic);
  }
};

// validarDatosUsuario, confirmarUsuario, modificarUsuario
export const changePasswordBeekeeper = async (req, res) => {
  try {
    const { idBK, user, password, newPassword } = req.body;
    if (await existUser(user)) {
      if (await getPasswordBeekeeper(idBK, password)) {
        await setPasswordBeekeeper(idBK, newPassword);
      } else {
        throw new Error("Contraseña incorrecta");
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// validarDatosUsuario, autenticarUsuario, cargarSessionUsuario
export const authBeekeeper = async (req, res) => {
  try {
    const { idBK, user, password } = req.body;
    const valid = await getUserBeekeeper(idBK);
    if (valid.user !== user) {
      return res.status(403).json({ error: "No existe este usuario." });
    } else {
      if (!(await getPasswordBeekeeper(idBK, password))) {
        return res.status(403).json({ error: "La contraseña es incorrecta." });
      }
    }
    res.status(200).json({ msg: "Bienvenido" });
  } catch (error) {}
};

export const authClient = async (req, res) => {
  try {
    const { idClient, email, password } = req.body;
    const valid = await getUserBeekeeper(idBK);
    if (valid.email !== email) {
      return res.status(403).json({ error: "No existe este usuario." });
    } else {
      if (!(await getPasswordBeekeeper(idClient, password))) {
        return res.status(403).json({ error: "La contraseña es incorrecta." });
      }
    }
    res.status(200).json({ msg: "Bienvenido" });
  } catch (error) {}
};



export const giveUsers = async (req, res) => {
  try {
    res.status(200).json(await getAllUsers());
  } catch (error) {}
};
