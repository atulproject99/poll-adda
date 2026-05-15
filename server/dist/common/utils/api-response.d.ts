import type { Response } from "express";
declare class ApiResponse {
    static ok(res: Response, message: string, data?: unknown): Response<any, Record<string, any>>;
}
export default ApiResponse;
//# sourceMappingURL=api-response.d.ts.map