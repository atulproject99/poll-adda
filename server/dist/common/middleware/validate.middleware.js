import ApiError from "../utils/api-error.js";
export default function validateData(DtoClass) {
    return (req, res, next) => {
        console.log("Call validation middleware...");
        console.log(req.body);
        if (!req.body)
            ApiError.badRequest("Data required... ");
        const { error, value } = DtoClass.validate(req.body);
        if (error) {
            next(ApiError.badRequest(error[0]));
        }
        else {
            req.body = value;
            next();
        }
    };
}
//# sourceMappingURL=validate.middleware.js.map