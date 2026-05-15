import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

export default class RegisterDto extends BaseDto {
  static schema = zod.object({
    name: zod.string().min(2).max(50),
    email: zod.string().email().toLowerCase(),
    password: zod.string().min(6),
    googleId: zod.string().optional(),
  });
}
