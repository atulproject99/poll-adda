import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";
export default class LoginDto extends BaseDto {
    static schema: zod.ZodObject<{
        email: zod.ZodString;
        password: zod.ZodString;
    }, zod.z.core.$strip>;
}
//# sourceMappingURL=login.dto.d.ts.map