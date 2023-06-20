import { ProblemModel } from "../models/Problem.model.js";

export const createProblem = async (nameProb, description, idBK) => {
    try {
        await ProblemModel.create({
            nameProb, description, idBK
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};