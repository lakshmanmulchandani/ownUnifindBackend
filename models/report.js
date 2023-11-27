import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
  {
    itemId :{
        ref: "Item",
        type: mongoose.Types.ObjectId,
        required: true
    },
    reportedBy: {
        ref: "User",
        type: mongoose.Types.ObjectId,
        required:true
    },
    description: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
