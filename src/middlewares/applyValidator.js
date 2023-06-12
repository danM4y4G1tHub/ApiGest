import { body } from "express-validator";
import { existCIApplic, existEmail } from "../services/User.service.js";

const permit = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

export const solicitudeValidator = [
  body("nameApplic")
    .trim()
    .notEmpty()
    .withMessage("El campo Nombre no puede estar vacío.")
    .matches(permit)
    .withMessage("El campo Nombre solo puede tener letras.")
    .isLength({ min: 3, max: 40 })
    .withMessage(
      "El campo Nombre debe tener una longitud mínima de 3 caracteres."
    )
    .matches(/^(?:[A-Z][a-z]*\s?)+$/)
    .withMessage("El campo Nombre debe comenzar con mayúscula."),
  body("lastNameApplic")
    .trim()
    .notEmpty()
    .withMessage("El campo Apellido no puede estar vacío.")
    .matches(permit)
    .withMessage("El campo Apellido solo puede tener letras.")
    .isLength({ min: 3, max: 40 })
    .withMessage(
      "El campo Apellido debe tener una longitud mínima de 3 caracteres."
    )
    .withMessage("El campo Apellido debe comenzar con mayúscula."),
  body("ciApplic").custom(async (ciApplic) => {
    if (await existCIApplic(ciApplic)) {
      throw new Error("El CI ya pertenece a otro usuario.");
    }
  }),
  body("ciApplic")
    .trim()
    .notEmpty()
    .withMessage("El campo Carnet de Identidad no puede estar vacío.")
    .isNumeric()
    .withMessage(
      "El campo Carnet de Identidad solo puede tener caracteres numéricos."
    )
    .isLength({ min: 11, max: 11 })
    .withMessage(
      "El campo Carnet de Identidad debe tener una longitud de 11 caracteres."
    ),
  body("telefApplic")
    .trim()
    .notEmpty()
    .withMessage("El campo Teléfono no puede estar vacío.")
    .isNumeric()
    .withMessage("El campo Teléfono solo puede tener caracteres numéricos.")
    .isLength({ min: 8, max: 11 })
    .withMessage(
      "El campo Teléfono debe tener una longitud mínima de 8 caracteres numéricos."
    ),
  body("emailApplic").custom(async (emailApplic) => {
    if (await existEmail(emailApplic)) {
      throw new Error("El E-mail ya está ocupado por otra persona.");
    }
  }),
  body("emailApplic")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Formato de email incorrecto.")
    .normalizeEmail(),
];
