// Call methods from classes Applicant, Solicitude, Beekeeper
import { 
    createApplicant,
    getApplicant,
    deleteApplicant,
    updateApplicant,
 } from "../services/Applicant.js";

import {
    createSolicitude,
    getSolicitude,
    updateSolicitude,
    deleteSolicitude
} from "../services/Solicitude.js";

import {
    createBeekeeper,
    getBeekeeper,
    deleteBeekeeper,
    updateBeekeeper,
    getBeekeepers
} from "../services/Beekeeper.js";

// export a method called registerUser() after to accept de solicitude of the applicant