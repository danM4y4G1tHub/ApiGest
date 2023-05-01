import { body } from "express-validator";
// import { existUser } from "../services/User.js";

export const registerValidator = [
  body("user").custom(async (value) => {
    const existingUser = await existUser(value);

    if (existingUser) {
      throw new Error("El nombre de usuario ya está ocupado");
    }
  }),
  body("email").custom(async (value) => {
    const existingUser = await User.findUserByEmail(value);

    if (existingUser) {
      throw new Error("El E-mail ya está en uso");
    }
  }),
  body("email", "Formato de email incorrecto")
    .optional()
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "La contraseña debe tener como mínimo 7 caracteres")
    .trim()
    .isLength({ min: 7 }),
];

export const loginValidator = [
  body("user").trim().notEmpty().escape(),
  body("email", "Formato de email incorrecto")
    .optional()
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "La contraseña debe tener como mínimo 7 caracteres")
    .trim()
    .isLength({ min: 7 }),
];