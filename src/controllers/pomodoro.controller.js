import createHttpError from "http-errors";
import * as PomodoroService from "../services/pomodoro.service.js";

import { errorCodes } from "../utils/errors/error.code.js";

export const getPomodoroById = async (req, res, next) => {
  try {
    const pomodoroId = req.params.id;
    const pomodoro = await PomodoroService.getPomodoroById(pomodoroId);
    res.status(200).send(pomodoro);
  } catch (e) {
    switch (e.code) {
      case errorCodes.POMODORO.POMODORO_NOT_FOUND:
        next(createHttpError(404, "Pomodoro not found"));
        break;
      case errorCodes.POMODORO.POMODORO_FECH_FAIL:
        next(createHttpError(500, "Get pomodoro error"));
        break;
      default:
        next(e);
    }
  }
};

export const getPomodoroByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const pomodoros = await PomodoroService.getPomodoroByUser(userId);

    res.status(200).send(pomodoros);
  } catch (e) {
    next(createHttpError(500, "Get pomodoros by user error"));
  }
};

export const patchTodosInPomodorosController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const todos = req.body;

    const pomodoro = await PomodoroService.patchTodosInPomodoros(userId, todos);
    res.status(200).send(pomodoro);
  } catch (e) {
    switch (e.code) {
      case errorCodes.POMODORO.POMODORO_NOT_FOUND:
        next(createHttpError(404, "Pomodoro not found"));
        break;
      case errorCodes.POMODORO.FAILD_TO_ADD_TODO:
        next(createHttpError(500, "Patch todo in pomodoro error"));
        break;
      default:
        next(e);
    }
  }
};

export const patchPomodoroStanteAndTime = async (req, res, next) => {
  try {
    const user = req.user;
    const { state, time } = req.body;
    const pomodoro = await PomodoroService.patchPomodoroStanteAndTime(
      user._id,
      state,
      time
    );
    res.status(200).send(pomodoro);
  } catch (e) {
    switch (e.code) {
      case errorCodes.POMODORO.POMODORO_NOT_FOUND:
        next(createHttpError(404, "Pomodoro no encontrado"));
        break;
      case errorCodes.POMODORO.FAILD_TO_UPDATE_POMODORO:
        next(createHttpError(500, "Error al actualizar pomodoro"));
        break;
      default:
        next();
    }
  }
};
