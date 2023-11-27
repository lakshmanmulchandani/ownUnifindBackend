import mongoose from "mongoose";

const tagSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    }
  });

export default mongoose.model("Tag", tagSchema);
