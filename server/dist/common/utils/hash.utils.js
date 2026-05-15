import crypto from "crypto";
const generateHash = () => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");
    return hashedToken;
};
const generateHashWithToken = (token) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return hashedToken;
};
export { generateHash, generateHashWithToken };
//# sourceMappingURL=hash.utils.js.map