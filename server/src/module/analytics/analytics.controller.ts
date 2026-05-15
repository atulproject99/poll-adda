import type { Request, Response } from "express";
import ApiResponse from "../../common/utils/api-response.js";
import * as analyticsService from "./analytics.services.js";

export const getPollAnalytics = async (req: Request, res: Response) => {
    const pollId = req.params.pollId as string;
    const userId = req.user?.userId;
    const analytics = await analyticsService.getPollAnalytics(pollId, userId);
    ApiResponse.ok(res, "Analytics fetched successfully", analytics);
};
