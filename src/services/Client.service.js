import { ClientModel } from "../models/Client.model.js";

export const createClient = async (idUser, email, password) => {
  try {
    const newCli = await ClientModel.create({
      email,
      password,
      idUser,
      registered: true
    });

    return newCli.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getClient = (req, res) => {};
export const updateClient = (req, res) => {};
export const deleteClient = (req, res) => {};
export const getClients = (req, res) => {};

export const existEmail = async (email) => {
  try {
    const exist = await ClientModel.findOne({
      where: {
        email,
      },
    });

    if (exist != null) return true;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};