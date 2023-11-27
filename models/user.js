import mongoose from "mongoose";
import moment from "moment/moment.js";
const userSchema = mongoose.Schema({
orgId: {type:Number, default:388},
  google :{type:String},
  userName: {type: String},
  userEmail: {type: String},
  password: {type: String},
  designation: {type: String, default:"Student"},
  phoneNO: {type: String},
  about: {type: String}
});

export default mongoose.model("User", userSchema);
