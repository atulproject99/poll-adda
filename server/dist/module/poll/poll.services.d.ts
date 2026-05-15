import mongoose from "mongoose";
import type { CreatePollRequestType } from "./poll.types.js";
export declare const createPoll: (pollData: CreatePollRequestType) => Promise<mongoose.Document<unknown, {}, {
    description: string;
    title: string;
    responseMode: "anonymous" | "authenticated";
    isPublished: boolean;
    questions: mongoose.Types.DocumentArray<{
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, {}, {}> & {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }>;
    createdBy: mongoose.Types.ObjectId;
    resultsPublished: boolean;
    expiresAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    description: string;
    title: string;
    responseMode: "anonymous" | "authenticated";
    isPublished: boolean;
    questions: mongoose.Types.DocumentArray<{
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, {}, {}> & {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }>;
    createdBy: mongoose.Types.ObjectId;
    resultsPublished: boolean;
    expiresAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const getPollById: (pollId: string) => Promise<mongoose.Document<unknown, {}, {
    description: string;
    title: string;
    responseMode: "anonymous" | "authenticated";
    isPublished: boolean;
    questions: mongoose.Types.DocumentArray<{
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, {}, {}> & {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }>;
    createdBy: mongoose.Types.ObjectId;
    resultsPublished: boolean;
    expiresAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    description: string;
    title: string;
    responseMode: "anonymous" | "authenticated";
    isPublished: boolean;
    questions: mongoose.Types.DocumentArray<{
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, {}, {}> & {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }>;
    createdBy: mongoose.Types.ObjectId;
    resultsPublished: boolean;
    expiresAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const deletePoll: (pollId: string, userId: string) => Promise<boolean>;
export declare const getUserPolls: (userId: string) => Promise<any[]>;
export declare const publishPoll: (pollId: string, userId: string) => Promise<mongoose.Document<unknown, {}, {
    description: string;
    title: string;
    responseMode: "anonymous" | "authenticated";
    isPublished: boolean;
    questions: mongoose.Types.DocumentArray<{
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, {}, {}> & {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }>;
    createdBy: mongoose.Types.ObjectId;
    resultsPublished: boolean;
    expiresAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    description: string;
    title: string;
    responseMode: "anonymous" | "authenticated";
    isPublished: boolean;
    questions: mongoose.Types.DocumentArray<{
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, {}, {}> & {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }>;
    createdBy: mongoose.Types.ObjectId;
    resultsPublished: boolean;
    expiresAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const toggleResultsVisibility: (pollId: string, userId: string) => Promise<mongoose.Document<unknown, {}, {
    description: string;
    title: string;
    responseMode: "anonymous" | "authenticated";
    isPublished: boolean;
    questions: mongoose.Types.DocumentArray<{
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, {}, {}> & {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }>;
    createdBy: mongoose.Types.ObjectId;
    resultsPublished: boolean;
    expiresAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    description: string;
    title: string;
    responseMode: "anonymous" | "authenticated";
    isPublished: boolean;
    questions: mongoose.Types.DocumentArray<{
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }, {}, {}> & {
        required: boolean;
        question: string;
        options: mongoose.Types.DocumentArray<{
            value: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            value: string;
        }, {}, {}> & {
            value: string;
        }>;
    }>;
    createdBy: mongoose.Types.ObjectId;
    resultsPublished: boolean;
    expiresAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const getDashboardStats: (userId: string) => Promise<{
    totalPolls: number;
    publishedPolls: number;
    activePolls: number;
    totalResponses: any;
}>;
//# sourceMappingURL=poll.services.d.ts.map