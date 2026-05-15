import { Router } from "express";
import validateData from "../../common/middleware/validate.middleware.js";
import authMiddleware from "../auth/auth.middleware.js";
import CreatePollDto from "./dto/create-poll.dto.js";
import * as controller from "./poll.controller.js";
import optionalAuth from "../auth/optional-auth.middleware.js";
const pollRouter = Router();
/// create
pollRouter.post("/", authMiddleware, validateData(CreatePollDto), controller.createPoll);
/// Fetch all users polls
pollRouter.get("/user/all", authMiddleware, controller.getUserPolls);
pollRouter.get("/stats", authMiddleware, controller.getDashboardStats);
pollRouter.get("/:id", optionalAuth, controller.getPollById);
pollRouter.patch("/:id/publish", authMiddleware, controller.publishPoll);
pollRouter.patch("/:id/toggle-results", authMiddleware, controller.toggleResultsVisibility);
pollRouter.delete("/:id", authMiddleware, controller.deletePoll);
export default pollRouter;
//# sourceMappingURL=poll.routes.js.map