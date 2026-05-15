import express from "express";
import cors from "cors";
import { handleErrorMiddleware } from "./common/middleware/error.middleware.js";
import notFoundMiddleware from "./common/middleware/not-found.middle.js";
import ApiResponse from "./common/utils/api-response.js";
import authRouter from "./module/auth/auth.routes.js";
import pollRouter from "./module/poll/poll.routes.js";
import responseRouter from "./module/poll-response/response.routes.js";
import analyticsRouter from "./module/analytics/analytics.routes.js";

export default function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/poll", pollRouter);
  app.use("/api/v1/responses", responseRouter);
  app.use("/api/v1/analytics", analyticsRouter);
  app.get("/health", (req, res) => ApiResponse.ok(res, "Hello  "));

  /// Middleware

  app.use(notFoundMiddleware);
  app.use(handleErrorMiddleware);
  return app;
}
