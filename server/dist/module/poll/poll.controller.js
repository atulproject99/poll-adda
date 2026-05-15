import ApiResponse from "../../common/utils/api-response.js";
import * as pollService from "./poll.services.js";
export const createPoll = async (req, res) => {
    const userId = req.user?.userId;
    const pollData = { ...req.body, createdBy: userId };
    const newPoll = await pollService.createPoll(pollData);
    ApiResponse.ok(res, "Poll created successfully", newPoll);
};
export const getPollById = async (req, res) => {
    const id = req.params.id;
    const poll = await pollService.getPollById(id);
    ApiResponse.ok(res, "Poll fetched successfully", poll);
};
export const deletePoll = async (req, res) => {
    const id = req.params.id;
    const userId = req.user?.userId;
    await pollService.deletePoll(id, userId);
    ApiResponse.ok(res, "Poll deleted successfully");
};
export const getUserPolls = async (req, res) => {
    const userId = req.user?.userId;
    const polls = await pollService.getUserPolls(userId);
    ApiResponse.ok(res, "User polls fetched successfully", polls);
};
export const publishPoll = async (req, res) => {
    const id = req.params.id;
    const userId = req.user?.userId;
    const poll = await pollService.publishPoll(id, userId);
    ApiResponse.ok(res, "Poll published successfully", poll);
};
export const toggleResultsVisibility = async (req, res) => {
    const id = req.params.id;
    const userId = req.user?.userId;
    const poll = await pollService.toggleResultsVisibility(id, userId);
    ApiResponse.ok(res, `Results ${poll.resultsPublished ? 'published' : 'unpublished'} successfully`, poll);
};
export const getDashboardStats = async (req, res) => {
    const userId = req.user?.userId;
    const stats = await pollService.getDashboardStats(userId);
    ApiResponse.ok(res, "Dashboard stats fetched successfully", stats);
};
//# sourceMappingURL=poll.controller.js.map