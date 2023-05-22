import { ApplicantModel } from "../models/Applicant.model.js";
import { nanoid } from "nanoid";

export const createApplicant = async (idU) => {
  try {
    const newApply = await ApplicantModel.create({
      token: nanoid(8),
      idUser: idU,
    });
    return newApply.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getApplicant = async (idApplic) => {
  try {
    const newApply = await ApplicantModel.findByPk(idApplic);
    return newApply;
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

export const deleteApplicant = async (idApply) => {
  try {
    await ApplicantModel.destroy({
      where: {
        idApply,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};