import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    itemDescription: { type: String, required: true },
    itemTag: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    type: { type: String, enum: ["lost", "found"], required: true },
    status: {
      type: String,
      enum: ["resolved", "unresolved"],
      required: true,
      default: "unresolved",
    },
    location: { type: String, required: true },
    imageSrc: { type: String, required: true },
    comments: [
      {
        itemBody: String,
        user: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        commentedOn: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
