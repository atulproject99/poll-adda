import type { NextFunction, Request, Response } from "express";
import type ApiResponse from "../utils/api-response.js";

export function handleErrorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const response: ApiResponse = {
    status: false,
    message: error.message,
  };
  if (error.name === "ValidationError") {
    return res.status(400).json({
      response,
    });
  }

  if (error.code === 11000) {
    return res.status(400).json(response);
  }

  return res.status(error.statusCode || 500).json(response);
}
