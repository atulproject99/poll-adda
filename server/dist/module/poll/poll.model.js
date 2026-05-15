import mongoose from "mongoose";
const optionSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    _id: false,
});
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    required: {
        type: Boolean,
        default: false,
    },
    options: {
        type: [optionSchema],
        default: [],
    },
}, {
    _id: false,
});
const pollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 150,
    },
    description: {
        type: String,
        trim: true,
        default: "",
        maxlength: 1000,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    responseMode: {
        type: String,
        enum: ["anonymous", "authenticated"],
        default: "anonymous",
    },
    expiresAt: {
        type: Date,
        default: null,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    resultsPublished: {
        type: Boolean,
        default: false,
    },
    questions: {
        type: [questionSchema],
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: "At least one question is required",
        },
    },
}, {
    timestamps: true,
});
export const Poll = mongoose.model("Poll", pollSchema);
//# sourceMappingURL=poll.model.js.map