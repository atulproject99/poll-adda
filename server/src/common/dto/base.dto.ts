import * as z from "zod";

type ValidateDataResult<T = any> = {
  error?: string[];
  value?: T;
};

export default class BaseDto {
  static schema = z.object({});

  static validate<T>(data: unknown): ValidateDataResult<T> {
    const result = this.schema.safeParse(data);
    if (!result.success) {
      return { error: result.error.issues.map((e) => e.message) };
    } else {
      return { value: result.data as T };
    }
  }
}
