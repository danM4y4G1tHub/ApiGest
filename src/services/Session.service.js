import { SessionModel } from "../models/Session.model.js";

export const createSession = async (duration, timesConnected, idUser) => {
    try {
        const newSess = await SessionModel.create({
            duration,
            timesConnected,
            idUser
        });

        return newSess.dataValues;
    } catch (error) {
        
    }
};
export const getSession = (req, res) => {};
export const updateSession = (req, res) => {};
export const deleteSession = (req, res) => {};