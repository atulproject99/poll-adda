import mongoose from "mongoose";

const pollResponseSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    answers: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
      default: [],
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const PollResponse = mongoose.model("PollResponse", pollResponseSchema);
