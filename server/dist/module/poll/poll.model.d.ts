import mongoose from "mongoose";
export declare const Poll: mongoose.Model<{
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
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
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
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
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
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
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
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
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
}, unknown, {
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
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
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
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=poll.model.d.ts.map