import type { LoginRequestType, RegisterRequestType, UserInfo, VerifyEmailRequestType } from "./auth.types.js";
export declare const registerUser: ({ name, email, password, }: RegisterRequestType) => Promise<UserInfo>;
export declare const verifyEmail: ({ email, verifyToken, code, }: VerifyEmailRequestType) => Promise<{
    accessToken: string;
    refreshToken: string;
    user: import("mongoose").Document<unknown, {}, UserInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UserInfo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    };
}>;
export declare const loginUser: ({ email, password }: LoginRequestType) => Promise<{
    verified: boolean;
    verifyToken: string | null | undefined;
    user: import("mongoose").Document<unknown, {}, UserInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UserInfo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    };
    accessToken?: never;
    refreshToken?: never;
    accessTokenExpiresAt?: never;
    refreshTokenExpiresAt?: never;
} | {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
    user: UserInfo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    };
    verified?: never;
    verifyToken?: never;
}>;
export declare const logoutUser: (userId: string) => Promise<null>;
export declare const me: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, UserInfo, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<UserInfo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
export declare const refreshToken: (email: string, refreshToken: string) => Promise<{
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
}>;
//# sourceMappingURL=auth.service.d.ts.map