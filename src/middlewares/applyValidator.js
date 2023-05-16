import { body } from "express-validator";

export const solicitudeValidator = [
  body("nameApplic")
    .trim()
    .notEmpty()
    .withMessage("Debe poner su nombre correctamente")
    .isAlpha()
    .withMessage("El nombre solo puede tener letras")
    .isLength({ min: 3, max: 40 })
    .withMessage("El nombre debe tener una longitud mínima de 3 caracteres")
    .matches(/^(?: [A-Z][a-z]*\s?)+$/)
    .withMessage("El nombre debe comenzar con mayúscula."),
  //   body("lastNameApplic")
  //     .trim()
  //     .notEmpty()
  //     .withMessage("Debe poner su apellido correctamente")
  //     .isAlpha()
  //     .withMessage("El apellido solo puede tener letras")
  //     .isLength({ min: 3, max: 40 })
  //     .withMessage("El apellido debe tener una longitud mínima de 3 caracteres")
  //     .matches(/^(?: [A-Z][a-z]*\s?)+$/)
  //     .withMessage("El apellido debe comenzar con mayúscula."),
  //   body("ciApplic")
  //     .trim()
  //     .notEmpty()
  //     .withMessage("Debe poner su Carnet de Identidad correctamente")
  //     .isNumeric()
  //     .withMessage("El Carnet de Identidad solo puede tener caracteres numéricos")
  //     .isLength({ min: 11, max: 11 })
  //     .withMessage(
  //       "El Carnet de identidad debe tener una longitud de 11 caracteres"
  //     ),
  //   body("telefApplic")
  //     .trim()
  //     .notEmpty()
  //     .withMessage("Debe poner su Carnet de Identidad correctamente")
  //     .isNumeric()
  //     .withMessage("El teléfono solo puede tener caracteres numéricos")
  //     .isLength({ min: 8, max: 11 })
  //     .withMessage(
  //       "El teléfono debe tener una longitud mínima de 8 caracteres numéricos"
  //     ),
  //   body("emailApplic")
  //     .trim()
  //     .notEmpty()
  //     .isEmail()
  //     .withMessage("Formato de email incorrecto")
  //     .normalizeEmail(),
  //   body("street")
  //     .trim()
  //     .notEmpty()
  //     .withMessage("Debe poner la calle correctamente"),
  //   body("noStreet")
  //   .optional()
  //   .notEmpty()
  //   .withMessage("Debe poner el número de la calle correctamente")
  //   .isNumeric()
  //     .withMessage("La calle solo puede tener caracteres numéricos")
];
