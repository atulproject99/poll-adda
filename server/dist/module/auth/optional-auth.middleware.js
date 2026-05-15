import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
export default function optionalAuth(req, res, next) {
    try {
        const authorizationToken = req.headers.authorization;
        if (!authorizationToken || !authorizationToken.startsWith("Bearer ")) {
            return next();
        }
        const token = authorizationToken.split(" ")[1];
        const payload = verifyAccessToken(token);
        if (payload) {
            req.user = {
                userId: payload.userId,
                email: payload.email,
            };
        }
        next();
    }
    catch (error) {
        // If token is invalid, we just continue as guest
        next();
    }
}
//# sourceMappingURL=optional-auth.middleware.js.map