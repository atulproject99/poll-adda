import ApiResponse from "../../common/utils/api-response.js";
import { getIO } from "../../common/socket/socket.js";
import * as pollResponseService from "./poll-response.services.js";
export const submitResponse = async (req, res) => {
    const pollId = req.params.pollId;
    const userId = req.user?.userId;
    const data = {
        pollId,
        userId,
        answers: req.body.answers
    };
    const response = await pollResponseService.submitResponse(data);
    // Emit socket event    
    const io = getIO();
    io.emit("response-update", { pollId });
    ApiResponse.ok(res, "Response submitted successfully", response);
};
//# sourceMappingURL=poll-response.controller.js.map