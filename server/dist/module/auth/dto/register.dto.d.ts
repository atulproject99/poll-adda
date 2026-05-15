import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";
export default class RegisterDto extends BaseDto {
    static schema: zod.ZodObject<{
        name: zod.ZodString;
        email: zod.ZodString;
        password: zod.ZodString;
        googleId: zod.ZodOptional<zod.ZodString>;
    }, zod.z.core.$strip>;
}
//# sourceMappingURL=register.dto.d.ts.map