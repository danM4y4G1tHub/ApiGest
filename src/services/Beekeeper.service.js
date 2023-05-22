import { BeekeeperModel } from "../models/Beekeeper.model.js";
import bcrypt from "bcrypt";

export const createBeekeeper = async (user, password, idApplic) => {
  try {
    const newBK = await BeekeeperModel.create({
      user,
      password,
      lastChange: new Date(),
      idApplic,
    });
    return newBK.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserBeekeeper = async (idBK) => {
  try {
    const BK = await BeekeeperModel.findByPk(idBK);
    return BK.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const existUser = async (user) => {
  try {
    const exist = await BeekeeperModel.findOne(
      { where: { user } },
      {
        attributes: ["user"],
      }
    );
    if (exist) return true;
    return false;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPasswordBeekeeper = async (idBK, password) => {
  try {
    const pass = await BeekeeperModel.findByPk(idBK);
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
      BeekeeperModel.findAll({ attributes: ["lastChange"] })
    );

    for (user of lastChange) {
      if (now - user >= threeMonths) {
        await serviceNotification(); // aqui envio un mensaje a la seccion del usuario o un email al usuariocorespondiente
      }
    }
  } catch (error) {}
};

// export const existPasswordBK = async (password) => {
//   try {
//     const users = await BeekeeperModel.findAll({attributes: ['password']});

//     for( const user of users ){
//       const match = await bcrypt.compare(password, user.password);
//       if(match) {
//         return true;
//       }
//     }
//     return false;
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const deleteBeekeeper = async (idBK) => {
  try {
    await BeekeeperModel.destroy({
      where: {
        idBK,
      },
    });
    return res.status().json({ msg: "Apicultor eliminado con éxito." });
  } catch (error) {}
};

export const setPasswordBeekeeper = async (idBK, newPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    newPassword = hashedPassword;
    await BeekeeperModel.update(
      { password: newPassword },
      {
        where: {
          idBK,
        },
      }
    );

    BeekeeperModel.addHook("beforeSave", "updateLastChange", async (user) => {
      if (user.changed("password")) {
        user.lastChange = new Date();
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getIdBeekeepers = async (idUser) => {
  try {
    const idB = await BeekeeperModel.findOne({ where: { idUser } });
    return idB;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getBeekeeper = async () => {};
export const getAllBeekeepers = async () => {};