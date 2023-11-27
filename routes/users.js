import express from "express";
import {login, signup, userDetails,deleteUser,updateUser,getUser} from "../controllers/users.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.get("/",auth,getUser)
router.delete("/:id",auth,deleteUser)
router.put("/:id",auth,updateUser)
router.post("/userDetails",auth, userDetails);
router.post("/signup", signup);
router.post("/login", login);


export default router;
