import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    itemDescription: { type: String, required: true },
    itemTag: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: { type: String, enum: ["lost", "found"], required: true },
    status: {
      type: String,
      enum: ["resolved", "unresolved"],
      required: true,
      default: "unresolved",
    },
    resolvedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    resolvedOn:{
      type: Date
    },
    location: { type: String, required: true },
    imageSrc: { type: String, required: true },
    comments: [
      {
        comment: String,
        user: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "User"
        },
        commentedOn: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
