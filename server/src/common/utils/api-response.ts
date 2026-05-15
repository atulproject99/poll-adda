import type { Response } from "express";
import type { ApiResponseType } from "../types/api-response.types.js";
class ApiResponse {
  static ok(res: Response, message: string, data: unknown = null) {
    const response = {
      status: true,
      message: message,
      data: data,
    } as ApiResponseType;
    return res.json(response);
  }
}

export default ApiResponse;
