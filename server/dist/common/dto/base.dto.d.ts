import * as z from "zod";
type ValidateDataResult<T = any> = {
    error?: string[];
    value?: T;
};
export default class BaseDto {
    static schema: z.ZodObject<{}, z.core.$strip>;
    static validate<T>(data: unknown): ValidateDataResult<T>;
}
export {};
//# sourceMappingURL=base.dto.d.ts.map