import { createUser } from "../services/User.service.js";
import { createApplicant } from "../services/Applicant.service.js";

export const registerSolicitude = async (req, res) => {
  try {
    const {
      nameApplic,
      lastNameApplic,
      ciApplic,
      telefApplic,
      emailApplic,
      provApplic,
      munApplic,
      street,
      noStreet,
      state,
    } = req.body;

    const rol = "solicitante";
    const active = true;
    const accountConfimr = false;
    const tokenConfirm = ""

    //crear un usuario y tomar su id
    const idUser = await createUser(rol, active, accountConfimr, tokenConfirm);
    //crear un solicitante pasandole la llave foranea idUser
    await createApplicant();
    //redireccionar a la pagina principal tras registrar al solicitante

    res.render("formSolicitude");
  } catch (error) {
    res.send(error);
  }
};
