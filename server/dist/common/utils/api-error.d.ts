declare class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(statusCode: number, message: string);
    static badRequest(message?: string): ApiError;
    static notFound(message?: string): ApiError;
    static unauthorized(message?: string): ApiError;
}
export default ApiError;
//# sourceMappingURL=api-error.d.ts.map