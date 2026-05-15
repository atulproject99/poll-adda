import ApiError from "../utils/api-error.js";
export default function notFoundMiddleware(req, res, next) {
    next(ApiError.notFound("Not found"));
}
//# sourceMappingURL=not-found.middle.js.map