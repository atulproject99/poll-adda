import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error.js";
export default function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next(ApiError.notFound("Not found"));
}
