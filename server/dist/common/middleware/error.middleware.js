export function handleErrorMiddleware(error, req, res, next) {
    const response = {
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
//# sourceMappingURL=error.middleware.js.map