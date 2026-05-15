import mongoose from "mongoose";
import ApiError from "../../common/utils/api-error.js";
import { Poll } from "./poll.model.js";
import type { CreatePollRequestType } from "./poll.types.js";

export const createPoll = async (pollData: CreatePollRequestType) => {
    try {
        const newPoll = await Poll.create(pollData);
        return newPoll;
    } catch (error: any) {
        throw ApiError.badRequest(error.message || "Failed to create poll");
    }
};

export const getPollById = async (pollId: string) => {
    try {
        const poll = await Poll.findById(pollId);
        if (!poll) {
            throw ApiError.notFound("Poll not found");
        }
        return poll;
    } catch (error: any) {
        if (error instanceof ApiError) throw error;
        throw ApiError.badRequest(error.message || "Failed to fetch poll");
    }
};

export const deletePoll = async (pollId: string, userId: string) => {
    try {
        const poll = await Poll.findById(pollId);
        if (!poll) {
            throw ApiError.notFound("Poll not found");
        }
        if (poll.createdBy.toString() !== userId.toString()) {
            throw ApiError.unauthorized("You are not authorized to delete this poll");
        }
        await Poll.findByIdAndDelete(pollId);
        return true;
    } catch (error: any) {
        if (error instanceof ApiError) throw error;
        throw ApiError.badRequest(error.message || "Failed to delete poll");
    }
};

export const getUserPolls = async (userId: string) => {
    try {
        const polls = await Poll.aggregate([
            { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: "pollresponses",
                    localField: "_id",
                    foreignField: "pollId",
                    as: "responses"
                }
            },
            {
                $addFields: {
                    responsesCount: { $size: "$responses" }
                }
            },
            {
                $project: {
                    responses: 0
                }
            }
        ]);
        return polls;
    } catch (error: any) {
        throw ApiError.badRequest(error.message || "Failed to fetch user polls");
    }
};

export const publishPoll = async (pollId: string, userId: string) => {
    try {
        const poll = await Poll.findById(pollId);
        if (!poll) {
            throw ApiError.notFound("Poll not found");
        }
        if (poll.createdBy.toString() !== userId.toString()) {
            throw ApiError.unauthorized("You are not authorized to publish this poll");
        }
        poll.isPublished = true;
        await poll.save();
        return poll;
    } catch (error: any) {
        if (error instanceof ApiError) throw error;
        throw ApiError.badRequest(error.message || "Failed to publish poll");
    }
};

export const toggleResultsVisibility = async (pollId: string, userId: string) => {
    try {
        const poll = await Poll.findById(pollId);
        if (!poll) {
            throw ApiError.notFound("Poll not found");
        }
        if (poll.createdBy.toString() !== userId.toString()) {
            throw ApiError.unauthorized("You are not authorized to modify this poll");
        }
        poll.resultsPublished = !poll.resultsPublished;
        await poll.save();
        return poll;
    } catch (error: any) {
        if (error instanceof ApiError) throw error;
        throw ApiError.badRequest(error.message || "Failed to toggle results visibility");
    }
};

export const getDashboardStats = async (userId: string) => {
    try {
        const userIdObj = new mongoose.Types.ObjectId(userId);
        
        const totalPolls = await Poll.countDocuments({ createdBy: userIdObj });
        const publishedPolls = await Poll.countDocuments({ createdBy: userIdObj, isPublished: true });
        
        // Use aggregation to count total responses for all user's polls
        const responseStats = await Poll.aggregate([
            { $match: { createdBy: userIdObj } },
            {
                $lookup: {
                    from: "pollresponses",
                    localField: "_id",
                    foreignField: "pollId",
                    as: "responses"
                }
            },
            {
                $project: {
                    responsesCount: { $size: "$responses" }
                }
            },
            {
                $group: {
                    _id: null,
                    totalResponses: { $sum: "$responsesCount" }
                }
            }
        ]);

        const totalResponses = responseStats.length > 0 ? responseStats[0].totalResponses : 0;

        return {
            totalPolls,
            publishedPolls,
            activePolls: publishedPolls,
            totalResponses
        };
    } catch (error: any) {
        throw ApiError.badRequest(error.message || "Failed to fetch stats");
    }
};
