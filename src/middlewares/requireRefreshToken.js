import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;

    if (!refreshTokenCookie) throw new Error("No existe el token.");

    const { uid } = jwt.verify(refreshTokenCookie, "6AFnadovn");
    res.uid = uid;
    next();
  } catch (error) {
    return res.status(401).res.json({ error: tokenVerificationErrors });
  }
};
