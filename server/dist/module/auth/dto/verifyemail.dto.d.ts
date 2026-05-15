import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";
export default class VerifyEmailDto extends BaseDto {
    static schema: zod.ZodObject<{
        email: zod.ZodString;
        verifyToken: zod.ZodString;
        code: zod.ZodString;
    }, zod.z.core.$strip>;
}
//# sourceMappingURL=verifyemail.dto.d.ts.map