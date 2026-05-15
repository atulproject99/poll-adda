import { Router } from "express";
import validateData from "../../common/middleware/validate.middleware.js";
import * as controller from "./auth.controller.js";
import authMiddleware from "./auth.middleware.js";
import LoginDto from "./dto/login.dto.js";
import RegisterDto from "./dto/register.dto.js";
import VerifyEmailDto from "./dto/verifyemail.dto.js";
const authRouter = Router();

authRouter.post(
  "/register",
  validateData(RegisterDto),
  controller.registerUser,
);
authRouter.post(
  "/verify-email",
  validateData(VerifyEmailDto),
  controller.verfiyEmail,
);

authRouter.post("/login", validateData(LoginDto), controller.loginUser);

authRouter.post("/logout", authMiddleware, controller.logoutUser);
authRouter.get("/me", authMiddleware, controller.me);

authRouter.get("/refresh-token", controller.refreshToken);
export default authRouter;
