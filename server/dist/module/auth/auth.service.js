import ApiError from "../../common/utils/api-error.js";
import { generateHash, generateHashWithToken, } from "../../common/utils/hash.utils.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, } from "../../common/utils/jwt.utils.js";
import { User } from "./auth.models.js";
import { comparePassword } from "../../common/utils/hash-password-utils.js";
/// Register user
export const registerUser = async ({ name, email, password, }) => {
    console.log(email);
    /// Check exisint user
    const user = await User.findOne({ email });
    console.log(user);
    if (user)
        throw ApiError.badRequest("User already exist");
    const addedUser = await User.create({
        name: name,
        email: email,
        password: password,
    });
    const hashedToken = generateHash();
    const updatedUser = await User.findByIdAndUpdate(addedUser._id, {
        verified: false,
        verifiedToken: hashedToken,
    });
    addedUser.verifiedToken = hashedToken;
    addedUser.verified = false;
    return addedUser;
};
/// Verify Email
export const verifyEmail = async ({ email, verifyToken, code, }) => {
    const user = await User.findOne({ email }).select("+verifiedToken +verified +refreshToken");
    if (!user) {
        throw ApiError.badRequest("User not found");
    }
    const existCode = "1111";
    if (existCode !== code) {
        throw ApiError.badRequest("Invalid code");
    }
    if (user.verifiedToken !== verifyToken) {
        throw ApiError.badRequest("Invalid verification token");
    }
    user.verified = true;
    user.verifiedToken = null;
    const accessToken = generateAccessToken({
        userId: user._id.toString(),
        email: user.email,
    });
    const refreshToken = generateRefreshToken({
        userId: user._id.toString(),
        email: user.email,
    });
    const hashedToken = generateHashWithToken(refreshToken);
    user.refreshToken = hashedToken;
    await user.save();
    return {
        accessToken,
        refreshToken,
        user: user,
    };
};
/// Login user
export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password +verified +verifiedToken +refreshToken");
    if (!user) {
        throw ApiError.badRequest("Invalid email or password");
    }
    if (!user.password) {
        throw ApiError.badRequest("Password login not available for this account");
    }
    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
        throw ApiError.badRequest("Invalid email or password");
    }
    if (!user.verified) {
        return {
            verified: false,
            verifyToken: user.verifiedToken,
            user: user,
        };
    }
    const accessToken = generateAccessToken({
        userId: user._id.toString(),
        email: user.email,
    });
    const refreshToken = generateRefreshToken({
        userId: user._id.toString(),
        email: user.email,
    });
    user.refreshToken = refreshToken;
    await user.save();
    const now = Date.now();
    return {
        accessToken,
        refreshToken,
        accessTokenExpiresAt: now + 15 * 60 * 1000,
        refreshTokenExpiresAt: now + 7 * 24 * 60 * 60 * 1000,
        user: user.toJSON(),
    };
};
/// Logout user
export const logoutUser = async (userId) => {
    if (!userId) {
        throw ApiError.unauthorized("Unauthorized access");
    }
    const user = await User.findById(userId).select("+refreshToken");
    if (!user) {
        throw ApiError.badRequest("User not found");
    }
    user.refreshToken = null;
    await user.save();
    return null;
};
// me
export const me = async (userId) => {
    if (!userId) {
        throw ApiError.unauthorized("Unauthorized access");
    }
    const user = await User.findById(userId);
    return user;
};
/// Refresh token
export const refreshToken = async (email, refreshToken) => {
    const user = await User.findOne({ email }).select("+refreshToken");
    const now = Date.now();
    if (!user) {
        throw ApiError.badRequest("User not found");
    }
    if (!user.refreshToken) {
        throw ApiError.unauthorized("Refresh token missing");
    }
    if (user.refreshToken !== refreshToken) {
        throw ApiError.unauthorized("Invalid refresh token");
    }
    try {
        verifyRefreshToken(refreshToken);
    }
    catch {
        throw ApiError.unauthorized("Expired refresh token");
    }
    const newAccessToken = generateAccessToken({
        userId: user._id.toString(),
        email: user.email,
    });
    const newRefreshToken = generateRefreshToken({
        userId: user._id.toString(),
        email: user.email,
    });
    user.refreshToken = newRefreshToken;
    await user.save();
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        accessTokenExpiresAt: now + 15 * 60 * 1000,
        refreshTokenExpiresAt: now + 7 * 24 * 60 * 60 * 1000,
    };
};
//# sourceMappingURL=auth.service.js.map