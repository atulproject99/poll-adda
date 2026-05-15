import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";
export default class VerifyEmailDto extends BaseDto {
    static schema = zod.object({
        email: zod.string().email().toLowerCase(),
        verifyToken: zod.string(),
        code: zod.string().length(4),
    });
}
//# sourceMappingURL=verifyemail.dto.js.map