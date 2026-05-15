import { Router } from "express";
import optionalAuth from "../auth/optional-auth.middleware.js";
import * as controller from "./analytics.controller.js";
const analyticsRouter = Router();
analyticsRouter.get("/:pollId", optionalAuth, controller.getPollAnalytics);
export default analyticsRouter;
//# sourceMappingURL=analytics.routes.js.map