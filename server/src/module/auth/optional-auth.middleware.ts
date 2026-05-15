import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import type { JwtPayload } from "jsonwebtoken";

export default function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorizationToken = req.headers.authorization;

    if (!authorizationToken || !authorizationToken.startsWith("Bearer ")) {
      return next();
    }

    const token = authorizationToken.split(" ")[1];
    const payload = verifyAccessToken(token!) as JwtPayload;

    if (payload) {
      req.user = {
        userId: payload.userId,
        email: payload.email,
      };
    }

    next();
  } catch (error) {
    // If token is invalid, we just continue as guest
    next();
  }
}
