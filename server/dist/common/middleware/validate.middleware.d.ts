import type { NextFunction, Request, Response } from "express";
import type BaseDto from "../dto/base.dto.js";
type DtoClassType = typeof BaseDto;
export default function validateData(DtoClass: DtoClassType): (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validate.middleware.d.ts.map