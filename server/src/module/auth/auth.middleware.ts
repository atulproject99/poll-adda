import type { NextFunction, Request, Response } from "express";
import ApiError from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";

import type { JwtPayload } from "jsonwebtoken";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    console.log("Auth middleware...");
    const authorizationToken = req.headers.authorization;

    if (!authorizationToken || !authorizationToken.startsWith("Bearer ")) {
      return next(ApiError.unauthorized("Missing bearer token"));
    }

    const token = authorizationToken.split(" ")[1];

    const payload = verifyAccessToken(token!) as JwtPayload;

    if (!payload) {
      return next(ApiError.unauthorized("Invalid token"));
    }

    req.user = {
      userId: payload.userId,
      email: payload.email,
    };

    next();
  } catch (error) {
    next(ApiError.unauthorized("Invalid or expired token"));
  }
}
