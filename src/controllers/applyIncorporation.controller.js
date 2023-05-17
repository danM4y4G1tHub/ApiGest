// Call methods from classes User, Applicant, Solicitude
import {
    createUser
} from "../services/User.service.js"

import { 
    createApplicant
 } from "../services/Applicant.service.js";

import {
    createSolicitude
} from "../services/Solicitude.service.js"

export const registerSolicitude = async (req, res) => {
    try {
        const { nameApplic } = req.boddy;
        const rol = "Solicitante";
        const active = true;
        const idUser = await createUser( rol, active );
        const idAplic = await createApplicant(idUser);
        res.status(201).json(await createSolicitude(nameApplic, idAplic));
    } catch (error) {
        
    }
}

// export a method called registerUser() after to accept de solicitude of the applicant

// validarDatosSolicitud, crearSolicitud, enviarCorreo, verificarConfirmacionCorreo
// validarTokenSolicitante, mostarDatosSolicitud,
// verificarEstadoSolicitud, notificarAceptacionSolicitud
//llamar al controllador loggerUser