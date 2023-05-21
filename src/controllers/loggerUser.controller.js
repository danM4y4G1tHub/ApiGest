import {
  createUser,
  getAllUsers,
  getRol,
} from "../services/User.service.js";
import { createBeekeeper, getPasswordBeekeeper, getUserBeekeeper } from "../services/Beekeeper.service.js";
import { createClient } from "../services/Client.service.js";
import { getApplicant } from "../services/Applicant.service.js";
import { createSession } from "../services/Session.service.js";
import { BeekeeperModel } from "../models/Beekeeper.model.js";

export const registerClient = async (req, res) => {
  try {
    // const { idUser, email, password, register } = req.body;
    console.log(req.body);
    // await getRol(idUser, rol);
    // res.status(201).json(await createClient(email, password, register, idUser));
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const registerBeeKeeper = async (req, res) => {
  const { idApplic, user, password } = req.body;
  const newBK = await BeekeeperModel.create({
    user,
    password,
    idApplic,
  });
  res.json(newBK)
  // const keyA = await getApplicant(idApplic);
  // res.status(201).json(await createBeekeeper(user, password, 7));
};

export const guestUser = async (req, res) => {
  try {
    const { rol, active, accountConfirm } = req.body;
    const keyU = await createUser(rol, active, accountConfirm);
    const duration = 5;
    const timesConnected = 1;
    const session = await createSession(duration, timesConnected, keyU.idUser);
    res.status(201).json(keyU);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// validarDatosUsuario, confirmarUsuario, modificarUsuario
export const changePasswordUser = (req, res) => {
  console.log(req.body);
  res.json(req.body);
};

// validarDatosUsuario, autenticarUsuario, cargarSessionUsuario
export const authUser = async (req, res) => {
  try {
    const {user, password} = req.body;
    const valid = await getUserBeekeeper(user);

    if(valid == null ){
      return res.status(403).json({error: "No existe este usuario."});
    } else{
      if(!await getPasswordBeekeeper(password)){
        return res.status(403).json({error: "La contraseña es incorrecta."})
      }
    }
  } catch (error) {
    
  }
};

export const giveUsers = async (req, res) => {
  try {
    res.status(200).json(await getAllUsers());
  } catch (error) {}
};
