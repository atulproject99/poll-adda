import mongoose from "mongoose";
import ApiError from "../../common/utils/api-error.js";
import { Poll } from "../poll/poll.model.js";
import { PollResponse } from "../poll-response/poll-response.model.js";

export const getPollAnalytics = async (pollId: string, requestingUserId?: string) => {
    try {
        const poll = await Poll.findById(pollId);
        if (!poll) {
            throw ApiError.notFound("Poll not found");
        }

        const isOwner = requestingUserId && poll.createdBy.toString() === requestingUserId.toString();
        
        if (!isOwner && !poll.resultsPublished) {
            throw ApiError.unauthorized("Poll results are not public yet");
        }

        const pollIdObj = new mongoose.Types.ObjectId(pollId);
        const responses = await PollResponse.find({ pollId: pollIdObj });
        const totalResponses = responses.length;

        const analytics = poll.questions.map((q, index) => {
            const optionsCounts: Record<string, number> = {};


            q.options.forEach(opt => {
                optionsCounts[opt.value] = 0;
            });


            responses.forEach(resp => {
                const answer = resp.answers.find((a: any) =>
                    a.questionId === `q${index + 1}` ||
                    a.questionId?.toString().trim() === q.question?.toString().trim() ||
                    a.questionId?.toString().trim() === index.toString()
                );

                if (answer) {
                    if (Array.isArray(answer.selectedOption)) {
                        answer.selectedOption.forEach((opt: string) => {
                            if (optionsCounts[opt] !== undefined) {
                                optionsCounts[opt]++;
                            }
                        });
                    } else {
                        const selected = answer.selectedOption;
                        if (optionsCounts[selected] !== undefined) {
                            optionsCounts[selected]++;
                        }
                    }
                }
            });

            const optionsStats = q.options.map(opt => {
                const count = optionsCounts[opt.value] || 0;
                const percentage = totalResponses > 0 ? (count / totalResponses) * 100 : 0;
                return {
                    option: opt.value,
                    count,
                    percentage: Number(percentage.toFixed(2))
                };
            });

            return {
                question: q.question,
                options: optionsStats
            };
        });

        return {
            pollTitle: poll.title,
            resultsPublished: poll.resultsPublished,
            totalResponses,
            analytics
        };
    } catch (error: any) {
        if (error instanceof ApiError) throw error;
        throw ApiError.badRequest(error.message || "Failed to fetch analytics");
    }
};
