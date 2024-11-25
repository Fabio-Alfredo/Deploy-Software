import { verifyToken } from "../utils/jwt.util.js";
import createHttpError from "http-errors";
import { getTokenUser, getUserById } from "../services/user.service.js";
import { config } from "../configs/config.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) next(createHttpError(401, "Token no proporcionado"));

    const [prefix, token] = authorization.split(" ");

    if (prefix !== config.prefix) next(createHttpError(401, "Prefix invalido"));
    if (!token) next(createHttpError(401, "Token no proporcionado"));

    const payload = verifyToken(token);
    if (!payload) next(createHttpError(401, "Token invalido"));

    const user = await getUserById(payload.id);
    if (!user) next(createHttpError(401, "Usuario no encontrado"));

    const compareToken = await getTokenUser(payload.id);
    if (!compareToken)
      return next(createHttpError(401, "Usuario no logueado "));
    if (compareToken.token !== token)
      return next(createHttpError(401, "Token invalido"));

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    next(createHttpError(401, "Unauthorized"));
  }
};

export const rolesMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const {_id} = req.user; 
      const user = await getUserById(_id);
      if (!user) return next(createHttpError(401, "User not found"));

      if (!requiredRoles.some(role => user.roles.includes(role))) 
        return next(createHttpError(403, "Accesso denegado por falta de permisos"));

      next();
    } catch (error) {
      next(error);
    }
  };
}