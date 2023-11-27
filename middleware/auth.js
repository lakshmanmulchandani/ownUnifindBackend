import jwt from "jsonwebtoken";
const JWT_SECRET = "jwt-secret";
const auth = (req, res, next) => {
  try {
    // extracting token from header
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
  
    let decodeData = jwt.verify(token,JWT_SECRET);
    // updating the req by providing userID so further requests can be processed considering this is the user
    req.userId = decodeData?.id;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
