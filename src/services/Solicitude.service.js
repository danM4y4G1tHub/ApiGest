import { SolicitudeModel } from "../models/Solicitude.model.js";

export const createSolicitude = async (
  nameApplic,
  lastNameApplic,
  ciApplic,
  telefApplic,
  emailApplic,
  street,
  noStreet,
  idApplic
) => {
  try {
    const newSol = await SolicitudeModel.create({
      nameApplic,
      lastNameApplic,
      ciApplic,
      certificApplic: false,
      telefApplic,
      emailApplic,
      street,
      noStreet,
      state: "Aceptada",
      idApplic,
    });
    return newSol.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getDataSolicitude = async (idApplic) => {
  try {
    const newSol = await SolicitudeModel.findOne({
      where: {
        idApplic
      }
    });

    return newSol.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCIApplicant = async (ciApplic) => {
  try {
    const newSol = await SolicitudeModel.findOne({
      where: {
        ciApplic
      }
    });

    return newSol;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
export const updateSolicitude = async (idApplic, state) => {
  try {
    SolicitudeModel.update({state}, {where: {
      idApplic
    }}).then(result => {
      return result;
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
