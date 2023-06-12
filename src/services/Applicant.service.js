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
    const newApply = await ApplicantModel.findOne(
      { where: { token } },
      {
        attributes: ["idApplic", "token"],
      }
    );
    return newApply;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setApplicantToken = async (token) => {
  try {
    await ApplicantModel.update(token, {
      where: {
        idApplic,
      },
    });
  } catch (error) {}
};