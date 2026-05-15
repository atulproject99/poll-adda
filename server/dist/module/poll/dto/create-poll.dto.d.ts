import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";
export default class CreatePollDto extends BaseDto {
    static schema: zod.ZodObject<{
        title: zod.ZodString;
        description: zod.ZodOptional<zod.ZodString>;
        responseMode: zod.ZodDefault<zod.ZodOptional<zod.ZodEnum<{
            anonymous: "anonymous";
            authenticated: "authenticated";
        }>>>;
        expiresAt: zod.ZodNullable<zod.ZodOptional<zod.z.ZodCoercedDate<unknown>>>;
        isPublished: zod.ZodDefault<zod.ZodOptional<zod.ZodBoolean>>;
        questions: zod.ZodArray<zod.ZodObject<{
            question: zod.ZodString;
            required: zod.ZodDefault<zod.ZodOptional<zod.ZodBoolean>>;
            options: zod.ZodDefault<zod.ZodOptional<zod.ZodArray<zod.ZodObject<{
                value: zod.ZodString;
            }, zod.z.core.$strip>>>>;
        }, zod.z.core.$strip>>;
    }, zod.z.core.$strip>;
}
//# sourceMappingURL=create-poll.dto.d.ts.map