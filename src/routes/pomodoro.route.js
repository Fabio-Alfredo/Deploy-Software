import {
  patchTodosInPomodorosController,
  getPomodoroByUser,
  patchPomodoroStanteAndTime,
} from "../controllers/pomodoro.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { patchPomodoroStanteAndTimeValidator } from "../validators/pomodoro.validator.js";
import { runValidation } from "../middlewares/validator.middleware.js";

const pomodoroRoute = Router();

pomodoroRoute.get("/user", authMiddleware, getPomodoroByUser);
pomodoroRoute.patch(
  "/state-time",
  authMiddleware,
  patchPomodoroStanteAndTimeValidator,
  runValidation,
  patchPomodoroStanteAndTime
);
pomodoroRoute.patch("/", authMiddleware, patchTodosInPomodorosController);

export default pomodoroRoute;
