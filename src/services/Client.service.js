import { ClientModel } from "../models/Client.model.js";
import { KartModel } from "../models/Kart.model.js";
import bcrypt from "bcrypt";

export const createClient = async (email, password, idUser) => {
  try {
    const newCli = await ClientModel.create({
      email,
      password,
      lastChange: new Date(),
      idUser,
    });

    return newCli.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEmailClient = async (email) => {
  try {
    const Client = await ClientModel.findOne({
      where: { email },
      attributes: ["email", "idUser"],
    });

    if (!Client) return null;

    return Client.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const existEmailClient = async (email) => {
  try {
    const exist = await ClientModel.findOne(
      { where: { email } },
      {
        attributes: ["email"],
      }
    );

    if (exist !== null) return true;
    return false;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPasswordClient = async (email, password) => {
  try {
    const pass = await ClientModel.findOne({
      where: {
        email,
      },
      attributes: ["password"],
    });
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

export const getClient = async (idUser) => {
  try {
    const client = await ClientModel.findOne({
      where: {
        idUser,
      },
      attributes: ["email"],
    });

    return client.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const isRegistred = async (idUser) => {
  try {
    if (ClientModel.findOne({ where: { idUser, registred: true } })) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createKart = async (
  idProd,
  nameProd,
  price,
  capacity,
  lotProd,
  idBK,
  nameApplic,
  telefApplic,
  direction,
  emailApplic,
  idUser
) => {
  try {
    const newKart = await KartModel.create({
      idProd,
      nameProd,
      price,
      capacity,
      lotProd,
      idBK,
      nameApplic,
      telefApplic,
      direction,
      emailApplic,
      idUser,
    });

    return newKart.dataValues;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getKart = async (idUser) => {
  try {
    const kart = await KartModel.findAll({
      raw: true,
      where: { idUser },
    });

    if (!kart) return null;

    return kart;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getIdUser = async (idClient) => {
  try {
    const id = await ClientModel.findByPk(idClient, {
      attributes: ["idUser"],
    });

    return id.dataValues;
  } catch (error) {}
};
