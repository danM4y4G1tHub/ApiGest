import { ApplicantModel } from "../models/Applicant.model.js";
import { nanoid } from "nanoid";

export const createApplicant = async (idUser) => {
  try {
    const newApply = await ApplicantModel.create({
      token: nanoid(8),
      idUser,
    });

    return newApply.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getApplicantToken = async (token) => {
  try {
    const tokenApplic = await ApplicantModel.findOne({
      where: { token },
      attributes: ["idUser", "token"],
    });
    console.log(tokenApplic.dataValues);
    if (tokenApplic === []) return null;

    return tokenApplic.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getToken = async (idUser) => {
  try {
    const token = await ApplicantModel.findOne({
      where: { idUser },
      attributes: ["token"],
    });

    return token.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setApplicantToken = async (idApplic, token) => {
  try {
    await ApplicantModel.update(token, {
      where: {
        idApplic,
      },
    });
  } catch (error) {}
};
