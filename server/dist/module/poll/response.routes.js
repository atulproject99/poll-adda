import { Router } from "express";
import validateData from "../../common/middleware/validate.middleware.js";
import authMiddleware from "../auth/auth.middleware.js";
import * as controller from "./poll.controller.js";
import SubmitResponseDto from "./dto/submit-response.dto.js";
const responseRouter = Router();
// We might want to make authMiddleware optional here if anonymous polls are allowed,
// but for now, we will add an optionalAuthMiddleware or just use authMiddleware if they want users to be logged in.
// Since responseMode can be anonymous, the middleware should not block unauthenticated users, or the controller should handle it.
// Let's create an optional auth middleware if it doesn't exist, or just skip auth middleware for now and let the controller handle it by decoding the token manually if provided.
// Let's look at how authMiddleware is implemented. For now, I will omit authMiddleware, or include it if the route requires authentication.
// I'll omit authMiddleware to allow anonymous users, but we can decode userId in controller if token is present.
responseRouter.post("/:pollId", validateData(SubmitResponseDto), controller.submitResponse);
export default responseRouter;
//# sourceMappingURL=response.routes.js.map