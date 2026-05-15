import type { Request, Response } from "express";
import ApiResponse from "../../common/utils/api-response.js";
import { getIO } from "../../common/socket/socket.js";
import * as pollResponseService from "./poll-response.services.js";

export const submitResponse = async (req: Request, res: Response) => {
    const pollId = req.params.pollId as string;
    const userId = req.user?.userId;
    const data = {
        pollId,
        userId,
        answers: req.body.answers
    } as any;
    const response = await pollResponseService.submitResponse(data);

    // Emit socket event    
    const io = getIO();
    io.emit("response-update", { pollId });

    ApiResponse.ok(res, "Response submitted successfully", response);
};
