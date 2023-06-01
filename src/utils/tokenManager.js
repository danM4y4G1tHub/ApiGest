import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  try {
    const expiresIn = 60 * 15; //15 minutos
    const token = jwt.sign({ uid }, "Sf1KxwRJSMeKKF2QT4fwp", { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log();
  }
};

export const generateRefreshToken = (uid, res) => {
  try {
    //                seg * hora * dia * Dias
    const expiresIn = 60 * 60 * 24 * 30;
    const refreshToken = jwt.sign({ uid }, "6AFnadovn", { expiresIn });

    //Obtiene la informacion de la cookie del navegador
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + expiresIn * 1000),
    });

  } catch (error) {
    console.log(error);
  }
};

export const errorsValidateToken = (error) => {
  switch (error) {
    case "invalid signature":
      return "firma no válida.";
    case "jwt expired":
      return "Token expirado.";
    case "invalid token":
      return "Token no válido.";
    default:
      return error;
  }
};
