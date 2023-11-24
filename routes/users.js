import express from "express";
import {login, signup, userDetails} from "../controllers/users.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.delete("/delete",auth)
router.put("/update",auth)
router.post("/userDetails",auth, userDetails);
router.post("/signup", signup);
router.post("/login", login);


export default router;
