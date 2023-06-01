import jwt from "jsonwebtoken";
// import { errorsValidateToken } from "../utils/tokenManager";

export const requireToken = (req, res, next) => {
  try {
    //Obtiene el token que viene de la cabecera con autorizacion Bearer
    let token = req.headers?.authorization;

    //Verifica que se envie la cabecera
    if (!token) throw new Error("No Bearer.");

    //(Bearer 2zxcDdfeveh) => Divide la cadena en dos usando " " como eje y se queda con la segunda parte de la
    //cadena
    token = token.split(" ")[1];

    //Destructura el cuerpo de los datos tomando solo el id del usuario
    //Verifica que el token sea valido
    const {uid} = jwt.verify(token, "Sf1KxwRJSMeKKF2QT4fwp");

    //Asigna el id del request el id del usuario para poder buscarlo en la DB
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);

    const TokeVerificationErrors = {
        "invalid signature": "La firma del JWT no es válida.",
        "jwt expired": "JWT expirado",
        "invalid token": "Token no válido.",
        "No Bearer": "Utiliza formato Bearer.",
        "jwt malformed": "JWT formato no válido."
    };

    return res.status(401).send({error: TokeVerificationErrors[error.message]});

    // return res.status(401).json({ error: errorsValidateToken(error.message) });
  }
};
