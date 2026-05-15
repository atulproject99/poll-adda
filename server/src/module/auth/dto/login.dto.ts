import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

export default class LoginDto extends BaseDto {
  static schema = zod.object({
    email: zod.string().email().toLowerCase(),
    password: zod.string().min(6),
  });
}
