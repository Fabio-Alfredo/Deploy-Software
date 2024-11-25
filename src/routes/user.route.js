import {
  getUserByIdController,
  getAllUsersController,
} from "../controllers/user.controller.js";
import { idParamValidator } from "../validators/user.validator.js";
import { runValidation } from "../middlewares/validator.middleware.js";
import { Router } from "express";
import {
  authMiddleware,
  rolesMiddleware,
} from "../middlewares/auth.middleware.js";
import { ROLES_USER } from "../utils/constants/roles.utils.js";

const userRoute = Router();

userRoute.get(
  "/",
  authMiddleware,
  rolesMiddleware([ROLES_USER.ADMIN, ROLES_USER.SYSADMIN]),
  getAllUsersController
);
userRoute.get(
  "/id/:userId",
  idParamValidator,
  runValidation,
  authMiddleware,
  rolesMiddleware([
    ROLES_USER.ADMIN,
    ROLES_USER.SYSADMIN,
    ROLES_USER.MODERATOR,
  ]),
  getUserByIdController
);

userRoute.get("/me", authMiddleware, getUserByIdController);

export default userRoute;
