import crypto from "crypto";
const generateHash = (): string => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
  return hashedToken;
};
const generateHashWithToken = (token: string) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return hashedToken;
};
export { generateHash, generateHashWithToken };
