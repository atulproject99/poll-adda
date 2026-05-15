import ApiError from "../../common/utils/api-error.js";
import { Poll } from "../poll/poll.model.js";
import { PollResponse } from "./poll-response.model.js";
export const submitResponse = async (data) => {
    try {
        const poll = await Poll.findById(data.pollId);
        if (!poll) {
            throw ApiError.notFound("Poll not found");
        }
        if (!poll.isPublished) {
            throw ApiError.badRequest("Cannot respond to an unpublished poll");
        }
        if (poll.resultsPublished) {
            throw ApiError.badRequest("This poll has ended and results have been published.");
        }
        if (poll.responseMode === "authenticated" && !data.userId) {
            throw ApiError.unauthorized("Authentication required for this poll");
        }
        const newResponse = await PollResponse.create({
            pollId: data.pollId,
            userId: data.userId || null,
            answers: data.answers
        });
        return newResponse;
    }
    catch (error) {
        if (error instanceof ApiError)
            throw error;
        throw ApiError.badRequest(error.message || "Failed to submit response");
    }
};
//# sourceMappingURL=poll-response.services.js.map