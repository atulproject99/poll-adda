import bcrypt from "bcrypt";
export async function hashPassword(plainPassword) {
    const hashPassword = await bcrypt.hash(plainPassword, 10);
    return hashPassword;
}
export async function comparePassword(plainPassowrd, hashPassword) {
    const isMatched = await bcrypt.compare(plainPassowrd, hashPassword);
    return isMatched;
}
//# sourceMappingURL=hash-password-utils.js.map