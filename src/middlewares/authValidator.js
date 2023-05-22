import { body } from "express-validator";
import { existUser } from "../services/Beekeeper.service.js";
import { existEmail } from "../services/Client.service.js";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerValidatorBeekeeper = [
  body("user").custom(async (user) => {
    if (await existUser(user)) {
      throw new Error("El nombre de usuario ya está ocupado por otra persona.");
    }
  }),
  body("user")
    .trim()
    .notEmpty()
    .withMessage("El campo Usuario no puede estar vacío.")
    .isLength({ min: 8 })
    .withMessage("El nombre de usuario debe tener como mínimo 8 caracteres."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo Constraseña no puede estar vacío.")
    .matches(passwordRegex)
    .withMessage(
      "La contraseña debe tener al menos una letra mayúscula, " +
        "una letra minúscula, un número y un caractér especial."
    )
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres."),
];

export const loginValidatorBeekeeper = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage("El campo Usuario no puede estar vacío.")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo Constraseña no puede estar vacío.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres."),
];

export const changeValidatorBeekeeper = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage("El campo Usuario no puede estar vacío.")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo Constraseña no puede estar vacío.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres."),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("El campo Constraseña no puede estar vacío.")
    .matches(passwordRegex)
    .withMessage(
      "La contraseña debe tener al menos una letra mayúscula, " +
        "una letra minúscula, un número y un caractér especial."
    )
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres."),
];

export const registerValidatorClient = [
  body("email").custom(async (email) => {
    if (await existEmail(email)) {
      throw new Error("El E-mail ya está ocupado por otra persona.");
    }
  }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El campo E-mail no puede estar vacío.")
    .isEmail()
    .withMessage("Formato de email incorrecto.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo Constraseña no puede estar vacío.")
    .matches(passwordRegex)
    .withMessage(
      "La contraseña debe tener al menos una letra mayúscula, " +
        "una letra minúscula, un número y un caractér especial."
    )
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres."),
];

export const loginValidatorClient = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El campo E-mail no puede estar vacío.")
    .isEmail()
    .withMessage("Formato de E-mail incorrecto.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo Constraseña no puede estar vacío.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres."),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("El campo Constraseña no puede estar vacío.")
    .matches(passwordRegex)
    .withMessage(
      "La contraseña debe tener al menos una letra mayúscula, " +
        "una letra minúscula, un número y un caractér especial."
    )
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres."),
];

export const changeValidatorClient = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El campo E-mail no puede estar vacío.")
    .isEmail()
    .withMessage("Formato de E-mail incorrecto.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo Constraseña no puede estar vacío.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres."),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("El campo Constraseña no puede estar vacío.")
    .matches(passwordRegex)
    .withMessage(
      "La contraseña debe tener al menos una letra mayúscula, " +
        "una letra minúscula, un número y un caractér especial."
    )
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres."),
];
