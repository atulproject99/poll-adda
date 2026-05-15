import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";
export default class RefreshTokenDto extends BaseDto {
    static schema: zod.ZodObject<{
        email: zod.ZodEmail;
        refreshToken: zod.ZodString;
    }, zod.z.core.$strip>;
}
//# sourceMappingURL=refreshtoken.dto.d.ts.map