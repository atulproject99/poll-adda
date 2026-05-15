import ApiError from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
export default function authMiddleware(req, res, next) {
    try {
        console.log("Auth middleware...");
        const authorizationToken = req.headers.authorization;
        if (!authorizationToken || !authorizationToken.startsWith("Bearer ")) {
            return next(ApiError.unauthorized("Missing bearer token"));
        }
        const token = authorizationToken.split(" ")[1];
        const payload = verifyAccessToken(token);
        if (!payload) {
            return next(ApiError.unauthorized("Invalid token"));
        }
        req.user = {
            userId: payload.userId,
            email: payload.email,
        };
        next();
    }
    catch (error) {
        next(ApiError.unauthorized("Invalid or expired token"));
    }
}
//# sourceMappingURL=auth.middleware.js.map