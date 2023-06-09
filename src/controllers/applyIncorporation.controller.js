import { createUser, getAllUsers } from "../services/User.service.js";
import { nanoid } from "nanoid";

import {
  createApplicant,
  getApplicant,
  getApplicantToken,
} from "../services/Applicant.service.js";

import { sendTokenApplicant } from "../utils/sendMail.js";

export const registerSolicitude = async (req, res) => {
  try {
    const {
      nameApplic,
      lastNameApplic,
      ciApplic,
      certificApplic,
      telefApplic,
      emailApplic,
      provApplic,
      munApplic,
      direction,
    } = req.body;

    const rol = "Solicitante";
    const tokenConfirm = null;
    const accountConfirm = false;
    const state = "Procesando";

    const keyU = await createUser(
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
    );

    console.log(keyU);

    const applicant = await createApplicant(keyU.idUser);
    const message = `Utilice este token: ${applicant.token} para consultar el estado de su solicitud.`;

    await sendTokenApplicant(keyU.email, message, applicant.token);

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

export const checkToken = async (req, res) => {
  try {
    const { token } = req.params;
    const keyA = await getApplicantToken(token);

    if (keyA.token == null) {
      res.status(404).json({ msg: "El token no es correcto" });
    } else {
      res.status(200).json(await getDataSolicitude(keyA.idApplic));
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const checkCI = async (req, res) => {
  try {
    const { ciApplic } = req.params;
    const keyA = await getCIApplicant(ciApplic);
    const data = await getApplicant(keyA.idApplic);

    if (data == null) {
      res.status(404).json({ msg: "El Carnet de Identidad no coincide." });
    } else {
      res.status(200).json(data.token);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const changeState = async (req, res) => {
  try {
    const { idApplic } = req.params;
    const { state } = req.params;

    res.status(200).json(await updateSolicitude(idApplic, state));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
