import { body, param } from "express-validator";
import { POMODORO_STATE } from "../utils/constants/pomodoroStates.utils.js";

export const patchStatePomodoroValidator = [
  body("state")
    .notEmpty()
    .withMessage("State is required")
    .isString()
    .withMessage("State must be a string")
    .isIn([POMODORO_STATE.WORK, POMODORO_STATE.NONE, POMODORO_STATE.BREAK])
    .withMessage("State must be one of pending, complete, progress"),

  body("time").optional().isNumeric().withMessage("Time must be a number"),
];

export const addTaskPomodoroValidator = [
  body("todoId")
    .notEmpty()
    .withMessage("Id task is required")
    .isMongoId()
    .withMessage("Id task must be a valid mongo id"),

  param("pomodoro")
    .notEmpty()
    .withMessage("Id pomodoro is required")
    .isMongoId()
    .withMessage("Id pomodoro must be a valid mongo id"),
];

export const patchPomodoroStanteAndTimeValidator = [
  body("state")
    .notEmpty()
    .withMessage("El estado es requerido")
    .isString()
    .withMessage("El estado debe de ser un string")
    .isIn([POMODORO_STATE.WORK, POMODORO_STATE.NONE, POMODORO_STATE.BREAK])
    .withMessage(
      "El pomodoro debe de tener el siguientes estado: trabajo, ninguno, descanso"
    ),

  body("time")
    .notEmpty()
    .withMessage("Tiempo es obligatorio")
    .isNumeric()
    .withMessage("El tiempo debe de estar en segundos"),
];
