import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  title: {type: String, required:true},
  itemDescription: {type: String, required:true},
  itemTags: {type: [String], required:true},
  userPosted: {type: String, required:true},
  userId: {type: String},
  type:{type:String,required:true},
  status:{type:String,required:true,default:"Unresolved"},
  postedOn: {type: Date, default: Date.now},
  location:{type:String, required:true},
  selectedFile: String,
  comments: [
    {
      itemBody: String,
      userAnswered: String,
      userId: String,
      answeredOn: {type: Date, default: Date.now},
    },
  ],
});

export default mongoose.model("Item", itemSchema);
