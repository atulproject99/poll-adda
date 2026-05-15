import mongoose from "mongoose";
import type { UserInfo } from "./auth.types.js";
export declare const User: mongoose.Model<UserInfo, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, UserInfo, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<UserInfo & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<UserInfo, mongoose.Model<UserInfo, any, any, any, any, any, UserInfo>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserInfo, mongoose.Document<unknown, {}, UserInfo, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<UserInfo & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: mongoose.SchemaDefinitionProperty<string | undefined, UserInfo, mongoose.Document<unknown, {}, UserInfo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserInfo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: mongoose.SchemaDefinitionProperty<string, UserInfo, mongoose.Document<unknown, {}, UserInfo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserInfo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: mongoose.SchemaDefinitionProperty<string, UserInfo, mongoose.Document<unknown, {}, UserInfo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserInfo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string | null | undefined, UserInfo, mongoose.Document<unknown, {}, UserInfo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserInfo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    googleId?: mongoose.SchemaDefinitionProperty<string | null | undefined, UserInfo, mongoose.Document<unknown, {}, UserInfo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserInfo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    avatar?: mongoose.SchemaDefinitionProperty<string | null | undefined, UserInfo, mongoose.Document<unknown, {}, UserInfo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserInfo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    refreshToken?: mongoose.SchemaDefinitionProperty<string | null | undefined, UserInfo, mongoose.Document<unknown, {}, UserInfo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserInfo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    verifiedToken?: mongoose.SchemaDefinitionProperty<string | null | undefined, UserInfo, mongoose.Document<unknown, {}, UserInfo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserInfo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    verified?: mongoose.SchemaDefinitionProperty<boolean | null | undefined, UserInfo, mongoose.Document<unknown, {}, UserInfo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserInfo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, UserInfo>, UserInfo>;
//# sourceMappingURL=auth.models.d.ts.map