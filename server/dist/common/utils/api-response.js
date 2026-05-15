class ApiResponse {
    static ok(res, message, data = null) {
        const response = {
            status: true,
            message: message,
            data: data,
        };
        return res.json(response);
    }
}
export default ApiResponse;
//# sourceMappingURL=api-response.js.map