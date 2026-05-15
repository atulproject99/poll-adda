import { Router } from "express";
import validateData from "../../common/middleware/validate.middleware.js";
import optionalAuth from "../auth/optional-auth.middleware.js";
import * as controller from "./poll-response.controller.js";
import SubmitResponseDto from "./dto/submit-response.dto.js";
const responseRouter = Router();
responseRouter.post("/:pollId", optionalAuth, validateData(SubmitResponseDto), controller.submitResponse);
export default responseRouter;
//# sourceMappingURL=response.routes.js.map