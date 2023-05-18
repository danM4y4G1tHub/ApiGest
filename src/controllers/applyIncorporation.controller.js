import { createUser, getAllUsers } from "../services/User.service.js";

import { createApplicant, getApplicant, getApplicantToken } from "../services/Applicant.service.js";

import { createSolicitude, getDataSolicitude, getCIApplicant, updateSolicitude } from "../services/Solicitude.service.js";

export const registerSolicitude = async (req, res) => {
  try {
    const {
      nameApplic,
      lastNameApplic,
      ciApplic,
      telefApplic,
      emailApplic,
      street,
      noStreet,
    } = req.body;

    const rol = "Solicitante";
    const active = true;
    const accountConfirm = true;

    const keyU = await createUser(rol, active, accountConfirm);
    console.log(keyU);
    const keyA = await createApplicant(keyU.idUser);
    console.log(keyA);
    res
      .status(201)
      .json(
        await createSolicitude(
          nameApplic,
          lastNameApplic,
          ciApplic,
          telefApplic,
          emailApplic,
          street,
          noStreet,
          keyA.idApplic
        )
      );
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const giveApplicants = async (req, res) => {
  try {
    res.status(200).json(await getAllUsers());
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const checkToken = async (req, res) => {
  try {
    const {token} = req.params;
    const keyA = await getApplicantToken(token);

    if(keyA == null){
      res.status(404).json({msg: "El token no es correcto"})
    } else{
      res.status(200).json(await getDataSolicitude(keyA.idApplic));
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const checkCI = async (req, res) => {
  try {
    const {ciApplic} = req.params;
    const keyA = await getCIApplicant(ciApplic);
    const data = await getApplicant(keyA.idApplic);

    if(data == null ){
      res.status(404).json({msg: "El Carnet de Identidad no coincide."});
    } else{
      res.status(200).json(data.token);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export const changeState = async (req, res) => {
  try {
    const {idApplic} = req.params;
    const {state} = req.params;

    res.status(200).json(await updateSolicitude(idApplic, state));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}