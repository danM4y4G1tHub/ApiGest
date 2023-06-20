import {
  createUserManager,
  createUserGuest,
  setAccountConfirm,
  setRol,
  getUser,
} from "../services/User.service.js";

import {
  createBeekeeper,
  getPasswordBeekeeper,
  getUserBeekeeper,
  existUser,
  setPasswordBeekeeper,
  getBeekeeper,
} from "../services/Beekeeper.service.js";
import {
  createClient,
  existEmailClient,
  getClient,
  getEmailClient,
  getPasswordClient,
} from "../services/Client.service.js";
import { createSession } from "../services/Session.service.js";
import { generateToken } from "../utils/tokenManager.js";
import {
  createManager,
  getManager,
  getPasswordManager,
  getUserManager,
} from "../services/Manager.service.js";
// import { sendEmail } from "../utils/sendMail.js";

export const registerGuest = async (req, res) => {
  try {
    const { rol } = req.body;
    const keyU = await createUserGuest(rol);

    const { token } = generateToken(keyU.idUser, res);
    const duration = 5;
    const timesConnected = 1;
    const session = await createSession(duration, timesConnected, keyU.idUser);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const registerClient = async (req, res) => {
  try {
    const { idUser, email, password } = req.body;

    if (await existEmailClient(email)) {
      throw new Error("El correo ya está ocupado por otro usuario.");
    } else {
      const rol = "Cliente";
      await setRol(idUser, rol);
      const Client = await createClient(email, password, idUser);
      const { token } = generateToken(Client.idClient, res);
      res.status(201).json({ token });
    }
    // generateRefreshToken(Client.idClient, res);
    // await sendEmail(email, token);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const authClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const valid = await getEmailClient(email);

    if (valid === null) {
      throw new Error("No existe este usuario.");
    } else {
      if (!(await getPasswordClient(email, password))) {
        throw new Error("La contraseña es incorrecta.");
      }
    }
    const { token } = generateToken(valid.idUser, res);

    res.status(200).json({
      token,
      role: "Cliente",
      email: valid.email,
      idUser: valid.idUser,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const confirmAcountClient = async (req, res) => {
//   try {
//     const { idClient, tokenConfirm } = req.params;

//     const Client = await getClient(idClient);

//     if (Client.tokenConfirm != tokenConfirm) {
//       throw new Error("Token de confirmacion incorrecto");
//     }

//     const accountConfirm = true;
//     await setAccountConfirm(BK.idUser, accountConfirm);
//   } catch (error) {
//     return res.status(404).json({ message: error.message });
//   }
// };

// export const confirmAcountBeekeeper = async (req, res) => {
//   try {
//     const { idBK, tokenConfirm } = req.params;

//     const BK = await getBeekeeper(idBK);

//     if (BK.tokenConfirm != tokenConfirm) {
//       throw new Error("Token de confirmacion incorrecto");
//     }
//     const accountConfirm = true;
//     await setAccountConfirm(BK.idUser, accountConfirm);
//     tokenConfirm = null;
//   } catch (error) {
//     return res.status(404).json({ message: error.message });
//   }
// };

export const registerBeeKeeper = async (req, res) => {
  try {
    const { idUser, user, password } = req.body;

    if (await existUser(user)) {
      throw new Error("El Usuario ya está ocupado por otra persona.");
    } else {
      const rol = "Apicultor";
      await setRol(idUser, rol);
      const idBK = await createBeekeeper(user, password, idUser);
      const { token } = generateToken(idBK, res);
      res.status(201).json({ token });
    }

    // const duration = 5;
    // const timesConnected = 1;
    // const session = await createSession(duration, timesConnected, keyU.idUser);
    // generateRefreshToken(BK.idBK, res);
    // await sendEmail(await getEmail(idApplic), token);
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: error.message });
  }
};

export const authBeekeeper = async (req, res) => {
  try {
    const { user, password } = req.body;

    const valid = await getUserBeekeeper(user);

    if (valid === null) {
      throw new Error("No existe este usuario.");
    } else {
      if (!(await getPasswordBeekeeper(user, password))) {
        throw new Error("La contraseña es incorrecta.");
      }
    }

    const { token } = generateToken(valid.idUser, res);

    res.status(202).json({
      token,
      role: "Apicultor",
      user: valid.user,
      idUser: valid.idUser,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const changePasswordBeekeeper = async (req, res) => {
  try {
    const { idBK, user, password, newPassword } = req.body;
    if (await existUser(user)) {
      if (await getPasswordBeekeeper(idBK, password)) {
        await setPasswordBeekeeper(idBK, newPassword);
      } else {
        throw new Error("Contraseña incorrecta.");
      }
    } else {
      throw new Error("El usuario no existe.");
    }
    res.status(200).json({ message: "Contraseña cambiada con éxito." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const registerManager = async (req, res) => {
  try {
    const { ciMgr, user, password } = req.body;

    const keyU = await createUserManager();
    const Mgr = await createManager(ciMgr, user, password, keyU.idUser);

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const authManager = async (req, res) => {
  try {
    const { user, password } = req.body;

    const valid = await getUserManager(user);
    console.log(valid);

    if (valid === null) {
      throw new Error("No existe este usuario.");
    } else {
      if (!(await getPasswordManager(user, password))) {
        throw new Error("La contraseña es incorrecta.");
      }
      const { token } = generateToken(valid.idUser, res);

      res.status(202).json({
        token,
        role: "Administrador",
        user: valid.user,
        idUser: valid.idUser,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const returnData = async (req, res) => {
  try {
    const idUser = req.uid;

    const { rol } = await getUser(idUser);

    if (rol === "Invitado") {
      return res.status(202).json({ role: "Invitado", idUser: data.idUser });
    }
    if (rol === "Cliente") {
      const { email } = await getClient(idUser);

      return res.status(202).json({ role: "Cliente", email, idUser });
    }
    if (rol === "Apicultor") {
      const { user } = await getBeekeeper(idUser);
      return res.status(202).json({ role: "Apicultor", user, idUser });
    }
    if (rol === "Administrador") {
      const { user } = await getManager(idUser);
      return res.status(202).json({ role: "Administrador", user, idUser });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const logOut = (req, res) => {
//   res.clearCookie("token");
//   // res.clearCookie("refreshToken");
//   res.json({ ok: true });
// };

// export const refreshToken = async (req, res) => {
//   try {
//     const { token, expiresIn } = generateToken(req.uid);
//     res.json({ token, expiresIn });
//   } catch (error) {
//     console.log(error.message);
//     res.status(401).json({ error: error.message });
//   }
// };
