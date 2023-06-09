import { createUser, getRol, setAccountConfirm } from "../services/User.service.js";
import {
  createBeekeeper,
  getPasswordBeekeeper,
  getUserBeekeeper,
  existUser,
  setPasswordBeekeeper,
  getBeekeeper,
} from "../services/Beekeeper.service.js";
import { createClient, getClient } from "../services/Client.service.js";
import { getApplicant, getEmail } from "../services/Applicant.service.js";
import { createSession } from "../services/Session.service.js";
import {
  generateToken,
} from "../utils/tokenManager.js";
// import { sendEmail } from "../utils/sendMail.js";

export const registerGuest = async (req, res) => {
  try {
    const { rol, accountConfirm } = req.body;
    const keyU = await createUser(rol, accountConfirm);

    // const duration = 5;
    // const timesConnected = 1;
    // const session = await createSession(duration, timesConnected, keyU.idUser);
    res.status(201).json(keyU);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const confirmAcountClient = async (req, res) => {
  try {
    const {idClient, tokenConfirm} = req.params;

    const Client = await getClient(idClient);

    if(Client.tokenConfirm != tokenConfirm){
      throw new Error("Token de confirmacion incorrecto");
    }

    const accountConfirm = true;
    await setAccountConfirm(BK.idUser, accountConfirm);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

export const registerClient = async (req, res) => {
  try {
    const { idUser, email, password } = req.body;
    // await getRol(idUser, rol);
    const Client = await createClient(email, password, idUser);

    const { token } = generateToken(Client.idClient);
    // generateRefreshToken(Client.idClient, res);

    await sendEmail(email, token);
    // res.status(201).json();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const confirmAcountBeekeeper = async (req, res) => {
  try {
    const {idBK, tokenConfirm} = req.params;

    const BK = await getBeekeeper(idBK);
    
    if(BK.tokenConfirm != tokenConfirm){
      throw new Error("Token de confirmacion incorrecto");
    }
    const accountConfirm = true;
    await setAccountConfirm(BK.idUser, accountConfirm);
    tokenConfirm = null;
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

export const registerBeeKeeper = async (req, res) => {
  try {
    const { idApplic, user, password } = req.body;
    const idUser = idApplic;
    const BK = await createBeekeeper(user, password, idUser);

    const { token } = generateToken(BK.idBK);
    // generateRefreshToken(BK.idBK, res);

    // await sendEmail(await getEmail(idApplic), token);
    
    res.status(201).json({ token});
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
    //Destructura el json para obtener cada parametro
    const { user, password } = req.body;
    console.log(req.body);

    //Hace un llamado a la funcion getUserBeekeeper para obtener el id del usuario a loggear
    const valid = await getUserBeekeeper(user);

    if (valid == null) {
      return res.status(404).json({ error: "No existe este usuario." });
    } else {
      if (!(await getPasswordBeekeeper(user, password))) {
        return res.status(404).json({ error: "La contraseña es incorrecta." });
      }
    }

    //Obtiene el jsonwebtoken de ese usuario para cargar su sesion
    const { token } = generateToken(valid);
    // generateRefreshToken(valid, res);
    res.status(200).json({ token });
  } catch (error) {
    res.status(404).json({ message: "Error de autenticacion" });
  }
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

export const logOut = (req, res) => {
  res.clearCookie("token");
  // res.clearCookie("refreshToken");
  res.json({ ok: true });
};

// export const refreshToken = async (req, res) => {
//   try {
//     const { token, expiresIn } = generateToken(req.uid);
//     res.json({ token, expiresIn });
//   } catch (error) {
//     console.log(error.message);
//     res.status(401).json({ error: error.message });
//   }
// };