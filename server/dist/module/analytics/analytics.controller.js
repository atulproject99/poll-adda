import ApiResponse from "../../common/utils/api-response.js";
import * as analyticsService from "./analytics.services.js";
export const getPollAnalytics = async (req, res) => {
    const pollId = req.params.pollId;
    const userId = req.user?.userId;
    const analytics = await analyticsService.getPollAnalytics(pollId, userId);
    ApiResponse.ok(res, "Analytics fetched successfully", analytics);
};
//# sourceMappingURL=analytics.controller.js.map