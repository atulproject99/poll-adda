import * as z from "zod";
export default class BaseDto {
    static schema = z.object({});
    static validate(data) {
        const result = this.schema.safeParse(data);
        if (!result.success) {
            return { error: result.error.issues.map((e) => e.message) };
        }
        else {
            return { value: result.data };
        }
    }
}
//# sourceMappingURL=base.dto.js.map