import type { NextFunction, Request, Response } from "express";
import type BaseDto from "../dto/base.dto.js";
import ApiError from "../utils/api-error.js";
type DtoClassType = typeof BaseDto;
export default function validateData(DtoClass: DtoClassType) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Call validation middleware...");
    console.log(req.body);
    if (!req.body) ApiError.badRequest("Data required... ");
    const { error, value } = DtoClass.validate(req.body);
    if (error) {
      next(ApiError.badRequest(error[0]));
    } else {
      req.body = value;
      next();
    }
  };
}
