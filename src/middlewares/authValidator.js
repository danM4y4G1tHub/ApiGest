import { body } from "express-validator";
import { existUser } from "../services/Beekeeper.service.js";
import { existEmail } from "../services/Client.service.js";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerValidator = [
  body("user")
    .optional()
    .custom(async (user) => {
      if (await existUser(user)) {
        throw new Error(
          "El nombre de usuario ya está ocupado por otra persona."
        );
      }
    }),
  body("email")
  .optional()
  .custom(async (email) => {
    if (await existEmail(email)) {
      throw new Error("El E-mail ya está ocupado por otra persona.");
    }
  }),
  body("email")
    .optional()
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
    ),
];

export const loginValidator = [
  body("user")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo Usuario no puede estr vacío.")
    .escape(),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo E-mail no puede estar vacío.")
    .isEmail()
    .withMessage("Formato de E-mail incorrecto.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo Constraseña no puede estar vacío")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres."),
];
