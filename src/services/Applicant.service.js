import { ApplicantModel } from "../models/Applicant.model.js"

export const getApplicant = (req, res) => {
    res.send("Getting applicants");
};

export const createApplicant = async (idUser) => {
    try {
        const newApply = await ApplicantModel.create();
    } catch (error) {
        
    };
};
const deleteApplicant = (req, res) => {};
const updateApplicant = (req, res) => {};

