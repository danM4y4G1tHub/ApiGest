import { ClientModel } from "../models/Client.model.js";
import jwt from "jsonwebtoken";

export const createClient = async (email, password, idUser) => {
  try {
    const newCli = await ClientModel.create({
      email,
      password,
      lastChange: new Date(),
      idUser,
      registered: true,
    });

    return newCli.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEmailClient = async (idClient) => {
  try {
    const cli = await ClientModel.findByPk(idClient);
    return cli.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const existEmail = async (email) => {
  try {
    const exist = await ClientModel.findOne(
      { where: { email } },
      {
        attributes: ["email"],
      }
    );

    if (exist) return true;
    return false;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPasswordClient = async (idClient, password) => {
  try {
    const pass = await ClientModel.findByPk(idClient);
    const match = await bcrypt.compare(password, pass.password);
    if (match) return true;
    return false;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const notifyPasswordChange = async () => {
  try {
    const threeMonths = 90 * 24 * 60 * 60 * 1000; //90 dias en milisegundos
    const now = new Date();
    const lastChange = new Date(
      ClientModel.findAll({ attributes: ["lastChange"] })
    );

    for (user of lastChange) {
      if (now - user >= threeMonths) {
        await serviceNotification(); // aqui envio un mensaje a la seccion del usuario o un email al usuariocorespondiente
      }
    }
  } catch (error) {}
};

export const deleteClient = (req, res) => {};

export const setPasswordClient = async (idClient, newPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    newPassword = hashedPassword;
    await ClientModel.update(
      { password: newPassword },
      {
        where: {
          idClient,
        },
      }
    );

    ClientModel.addHook("beforeSave", "updateLastChange", async (user) => {
      if (user.changed("password")) {
        user.lastChange = new Date();
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getClient = async (idClient) => {
  try {
    const client = await ClientModel.findByPk(idClient);

    return client;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllClients = async () => {};