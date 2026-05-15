import * as zod from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

const optionSchema = zod.object({
  value: zod.string().trim().min(1, "Option value is required"),
});

const questionSchema = zod.object({
  question: zod.string().trim().min(1, "Question text is required"),
  required: zod.boolean().optional().default(false),
  options: zod.array(optionSchema).optional().default([]),
});

export default class CreatePollDto extends BaseDto {
  static schema = zod.object({
    title: zod.string().trim().min(3).max(150),
    description: zod.string().trim().max(1000).optional(),
    responseMode: zod.enum(["anonymous", "authenticated"]).optional().default("anonymous"),
    expiresAt: zod.coerce.date().optional().nullable(),
    isPublished: zod.boolean().optional().default(false),
    questions: zod.array(questionSchema).min(1, "At least one question is required"),
  });
}
