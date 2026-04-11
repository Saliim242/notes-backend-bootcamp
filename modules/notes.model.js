import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide userId"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Note title is required"],
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Note content is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    // createdOn: {
    //   type: Date,
    //   default: Date.now(),
    // },
  },
  { timestamps: true },
);

export const Notes = mongoose.model("Notes", notesSchema);
