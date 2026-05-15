import type { SubmitResponseRequestType } from "./poll-response.types.js";
export declare const submitResponse: (data: SubmitResponseRequestType) => Promise<import("mongoose").Document<unknown, {}, {
    pollId: import("mongoose").Types.ObjectId;
    answers: any[];
    submittedAt: NativeDate;
    userId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    pollId: import("mongoose").Types.ObjectId;
    answers: any[];
    submittedAt: NativeDate;
    userId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
//# sourceMappingURL=poll-response.services.d.ts.map