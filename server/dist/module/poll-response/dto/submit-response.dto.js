import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";
const answerPayloadSchema = zod.object({
    questionId: zod.string().trim().min(1, "questionId is required"),
    selectedOption: zod.union([zod.string(), zod.array(zod.string())]),
});
export default class SubmitResponseDto extends BaseDto {
    static schema = zod.object({
        answers: zod.array(answerPayloadSchema).min(1, "At least one answer is required"),
    });
}
//# sourceMappingURL=submit-response.dto.js.map