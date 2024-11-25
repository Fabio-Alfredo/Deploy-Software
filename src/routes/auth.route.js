import { loginController, logoutController, registerController } from "../controllers/auth.controller.js";
import { Router } from "express";
import { runValidation } from "../middlewares/validator.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {registerValidator, loginValidator} from "../validators/auth.validator.js";

const authRoute = Router();


authRoute.post("/register", registerValidator, runValidation, registerController);
authRoute.post("/login", loginValidator, runValidation, loginController);
authRoute.delete("/logout",authMiddleware, logoutController);

export default authRoute;

