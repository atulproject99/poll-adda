import mongoose from "mongoose";
export declare const PollResponse: mongoose.Model<{
    pollId: mongoose.Types.ObjectId;
    answers: any[];
    submittedAt: NativeDate;
    userId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    pollId: mongoose.Types.ObjectId;
    answers: any[];
    submittedAt: NativeDate;
    userId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    pollId: mongoose.Types.ObjectId;
    answers: any[];
    submittedAt: NativeDate;
    userId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    pollId: mongoose.Types.ObjectId;
    answers: any[];
    submittedAt: NativeDate;
    userId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    pollId: mongoose.Types.ObjectId;
    answers: any[];
    submittedAt: NativeDate;
    userId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    pollId: mongoose.Types.ObjectId;
    answers: any[];
    submittedAt: NativeDate;
    userId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    pollId: mongoose.Types.ObjectId;
    answers: any[];
    submittedAt: NativeDate;
    userId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    pollId: mongoose.Types.ObjectId;
    answers: any[];
    submittedAt: NativeDate;
    userId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=poll-response.model.d.ts.map