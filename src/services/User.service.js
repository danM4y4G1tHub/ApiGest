import { UserModel } from "../models/User.model.js";

//Invitado {
export const createUserGuest = async (rol) => {
  try {
    const guest = await UserModel.create({
      rol,
      active: true,
      accountConfirm: false,
    });
    return guest.dataValues;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
// }

//Solicitante {
export const existCIApplic = async (ciApplic) => {
  try {
    const exist = await UserModel.findOne(
      { where: { ciApplic } },
      { attributes: ["ciApplic"] }
    );

    if (exist) return true;
    return false;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const existEmail = async (emailApplic) => {
  try {
    const exist = await UserModel.findOne({
      where: {
        emailApplic,
      },
    });

    if (exist) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUserApplicant = async (
  nameApplic,
  lastNameApplic,
  ciApplic,
  certificApplic,
  telefApplic,
  emailApplic,
  provApplic,
  munApplic,
  direction,
  state,
  rol,
  tokenConfirm
) => {
  try {
    const newUser = await UserModel.create({
      nameApplic,
      lastNameApplic,
      ciApplic,
      certificApplic,
      telefApplic,
      emailApplic,
      provApplic,
      munApplic,
      direction,
      state,
      rol,
      active: true,
      tokenConfirm,
      accountConfirm: false,
    });
    return newUser.dataValues;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getDataSolicitude = async (idUser) => {
  try {
    const data = await UserModel.findByPk(idUser, {
      attributes: [
        "nameApplic",
        "lastNameApplic",
        "ciApplic",
        "telefApplic",
        "emailApplic",
        "provApplic",
        "munApplic",
        "direction",
        "state",
      ],
    });

    return data.dataValues;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getCIApplicant = async (ciApplic) => {
  try {
    const ci = await UserModel.findOne({
      where: { ciApplic },
      attributes: ["idUser", "ciApplic"],
    });

    if (ci === []) return null;

    return ci.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setRol = async (idUser, rol) => {
  try {
    await UserModel.update(
      { rol },
      {
        where: {
          idUser,
        },
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// }

//Administrador {
export const createUserManager = async () => {
  try {
    const manager = await UserModel.create({
      rol: "Administrador",
      active: true,
      accountConfirm: false,
    });

    return manager.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsersApplicants = async (rol) => {
  try {
    const usersApplicants = await UserModel.findAll({
      where: { rol },
      attributes: [
        "idUser",
        "nameApplic",
        "lastNameApplic",
        "ciApplic",
        "certificApplic",
        "telefApplic",
        "emailApplic",
        "provApplic",
        "munApplic",
        "direction",
        "state",
        "rol",
      ],
    });

    return usersApplicants;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setState = async (idUser, state) => {
  try {
    await UserModel.update({ state }, { where: { idUser } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// }

//Apicultor {
export const userProvinceMunicipality = async (provApplic, munApplic) => {
  try {
    const provMunUsers = await UserModel.findAll({
      where: {
        provApplic,
        munApplic,
      },
      raw: true,
      attributes: ["idUser"],
    });

    if (provMunUsers.idUser === null) {
      return null;
    } else {
      return provMunUsers;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getInfoBee = async (idUser) => {
  try {
    const info = await UserModel.findOne({
      attributes: ["nameApplic", "emailApplic", "telefApplic", "direction"],
      where: idUser,
    });

    return info.dataValues;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
// }

export const getUser = async (idUser) => {
  try {
    const user = await UserModel.findByPk(idUser);

    return user;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (idUser) => {
  try {
    await UserModel.destroy({
      where: {
        idUser,
      },
    });
    res.status(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRol = async (idUser) => {
  try {
    const rol = await UserModel.findByPk(idUser);

    return rol.dataValues;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const isActive = async (idUser) => {
  try {
    const active = await UserModel.findByPk(idUser);
    return active;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setActive = async (idUser, active) => {
  try {
    await UserModel.update(
      { active },
      {
        where: {
          idUser,
        },
      }
    );
    res.status(200).json({ msg: "Active actualizado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAccountConfirm = async (idUser) => {
  try {
    const confirmed = await UserModel.findByPk(idUser);
    return confirmed;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setAccountConfirm = async (idUser, accountConfirm) => {
  try {
    await UserModel.update(accountConfirm, {
      where: {
        idUser,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
