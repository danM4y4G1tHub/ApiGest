import jwt from "jsonwebtoken";

export const generateToken = (uid, res) => {
  try {
    // const expiresIn = 60 * 15; //15 minutos
    const token = jwt.sign({ uid }, "Sf1KxwRJSMeKKF2QT4fwp");
    
    return { token };
  } catch (error) {
    console.log(error);
  }
};

// export const generateRefreshToken = (uid, res) => {
//   try {
//     //                seg * hora * dia * Dias
//     const expiresIn = 60 * 60 * 24 * 30;
//     const refreshToken = jwt.sign({ uid }, "6AFnadovn", { expiresIn });

//     //Obtiene la informacion de la cookie del navegador
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: false,
//       expires: new Date(Date.now() + expiresIn * 1000),
//     });

//   } catch (error) {
//     console.log(error);
//   }
// };

export const tokenVerificationErrors = {
  "invalid signature": "La firma del JWT no es válida.",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no válido.",
  "No Bearer": "Utiliza formato Bearer.",
  "jwt malformed": "JWT formato no válido.",
};
