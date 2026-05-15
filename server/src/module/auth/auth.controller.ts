import type { Request, Response } from "express";
import ApiResponse from "../../common/utils/api-response.js";
import * as authService from "./auth.service.js";
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await authService.registerUser({
    name: name,
    email: email,
    password: password,
  });
  ApiResponse.ok(
    res,
    "4 digit code sent on email please check your inbox",
    user,
  );
};

export const verfiyEmail = async (req: Request, res: Response) => {
  const { email, verifyToken, code } = req.body;
  const user = await authService.verifyEmail({
    email: email,
    verifyToken: verifyToken,
    code: code,
  });
  ApiResponse.ok(res, "Email verified", user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUser({
    email: email,
    password: password,
  });
  if (user.verifyToken != null) {
    ApiResponse.ok(
      res,
      "4 digit code sent on email please check your inbox",
      user,
    );
  } else {
    ApiResponse.ok(res, "Logged successfully", user);
  }
};
export const logoutUser = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  await authService.logoutUser(userId!);
  ApiResponse.ok(res, "Logged out successfully");
};
export const me = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const user = await authService.me(userId!);
  ApiResponse.ok(res, "User fetched successfully", user);
};

export const refreshToken = async (req: Request, res: Response) => {
  const { email, refreshToken } = req.body;
  const tokenData = await authService.refreshToken(email, refreshToken);
  ApiResponse.ok(res, "Toke refresh successfully", tokenData);
};
