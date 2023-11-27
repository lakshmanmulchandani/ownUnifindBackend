import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";
const auth = (req, res, next) => {
  try {
    // extracting token from header
    const token = req.headers.authorization.split(" ")[1];
  
    let decodeData = jwt.verify(token,JWT_SECRET);
   
    // updating the req by providing userID so further requests can be processed considering this is the user
    req.userId = decodeData?.id;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
