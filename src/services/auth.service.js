import mongoose from "mongoose";
import { errorCodes } from "../utils/errors/error.code.js";
import * as userReposiry from "../repositories/user.repository.js";
import { ServiceError } from "../errors/servise.error.js";
import { createToken } from "../utils/jwt.util.js";
import { createPomodoro } from "./pomodoro.service.js";
import { addPomodoroUser } from "./user.service.js";

export const register = async (user) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    const newUser = await userReposiry.createUser(user, opts);

    const pomodor = await createPomodoro({ id_user: newUser._id }, opts);

    await addPomodoroUser(newUser._id, pomodor._id, opts);

    await session.commitTransaction();

    return newUser;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      "Error al registrar usuario",
      e.code || errorCodes.AUTH.FAILD_TO_CREATE_USER
    );
  } finally {
    await session.endSession();
  }
};

export const login = async (email, password) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const existUser = await userReposiry.findUserByEmail(email);

    if (!existUser || !(await existUser.comparePassword(password)))
      throw new ServiceError(
        "Invalid credentials",
        errorCodes.AUTH.INVALID_CREDENTIALS
      );

    const token = createToken({ id: existUser._id, roles: existUser.roles });

    if (!token)
      throw new ServiceError(
        "Token creation error",
        errorCodes.AUTH.FAILD_CREATE_TOKEN
      );

    await userReposiry.addToken(existUser._id, token.token, opts);

    await session.commitTransaction();

    return token;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      "Login error",
      e.code || errorCodes.AUTH.FAILD_TO_LOGIN
    );
  } finally {
    await session.endSession();
  }
};

export const logout = async (userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    await userReposiry.deleteToken(userId, opts);

    await session.commitTransaction();

    return "Logout success";
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      "Logout error",
      e.code || errorCodes.AUTH.FAILD_TO_LOGOUT
    );
  } finally {
    await session.endSession();
  }
};
