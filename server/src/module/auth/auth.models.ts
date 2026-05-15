import mongoose from "mongoose";
import { hashPassword } from "../../common/utils/hash-password-utils.js";
import type { UserInfo } from "./auth.types.js";
const userSchema = new mongoose.Schema<UserInfo>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxLength: 322,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      default: null,
      select: false,
    },
    googleId: {
      type: String,
      default: null,
      select: false,
    },

    avatar: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    verifiedToken: {
      type: String,
      select: false,
    },
    verified: {
      type: Boolean,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, returnedObject) => {
        const { _id, __v, password, googleId, refreshToken, ...safeUser } =
          returnedObject;

        return {
          userId: _id.toString(),
          ...safeUser,
        };
      },
    },
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const hashedPassword: string = await hashPassword(this.password!);
  this.password = hashedPassword;

  /// hash password
});

export const User = mongoose.model("User", userSchema);
