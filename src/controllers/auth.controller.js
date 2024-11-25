import { register, login, logout } from "../services/auth.service.js";
import { existUserByEmail } from "../services/user.service.js";
import { errorCodes } from "../utils/errors/error.code.js";
import createHttpError from "http-errors";

export const registerController = async (req, res, next) => {
  try {
    const user = req.body;

    const existUser = await existUserByEmail(user.email);
    if (existUser) throw new createHttpError(400, "El correo ya está en uso");

    await register(user);

    res.status(201).send({ message: "User created successfully" });
  } catch (e) {
    switch (e.code) {
      case errorCodes.AUTH.USER_ALREADY_EXISTS:
        next(createHttpError(400, "El correo ya está en uso"));
        break;
      case errorCodes.AUTH.FAILD_TO_CREATE_USER:
        next(createHttpError(500, "Error al registrar usuario"));
        break;
      case errorCodes.POMODORO.CREATE_POMODORO_FAIL:
        next(createHttpError(500, "Error al asignar pomodoro al usuario"));
        break;
      case errorCodes.USER.FAILD_TO_ADD_POMODORO:
        next(createHttpError(500, "Error al asignar pomodoro al usuario"));
        break;
      default:
        next(e);
    }
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);

    res.status(200).send(token);
  } catch (e) {
    switch (e.code) {
      case errorCodes.AUTH.INVALID_CREDENTIALS:
        next(createHttpError(401, "Credenciales inválidas"));
        break;
      case errorCodes.AUTH.FAILD_CREATE_TOKEN:
        next(createHttpError(500, "Error en la creación del token"));
        break;
      case errorCodes.AUTH.FAILD_TO_LOGIN:
        next(createHttpError(500, "Login error"));
        break;
      default:
        next(e);
    }
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await logout(userId);

    res.status(200).send({ message: "Logout successfully" });
  } catch (e) {
    switch (e) {
      case errorCodes.AUTH.FAILD_TO_LOGOUT:
        next(createHttpError(500, "Logout error"));
        break;
      default:
        next(e);
    }
  }
};
