import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";
export default class SubmitResponseDto extends BaseDto {
    static schema: zod.ZodObject<{
        answers: zod.ZodArray<zod.ZodObject<{
            questionId: zod.ZodString;
            selectedOption: zod.ZodUnion<readonly [zod.ZodString, zod.ZodArray<zod.ZodString>]>;
        }, zod.z.core.$strip>>;
    }, zod.z.core.$strip>;
}
//# sourceMappingURL=submit-response.dto.d.ts.map