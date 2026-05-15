import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

export default class RefreshTokenDto extends BaseDto {
  static schema = zod.object({
    email: zod.email().toLowerCase(),
    refreshToken: zod.string(),
  });
}
