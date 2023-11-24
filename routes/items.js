import express from "express";
import auth from "../middleware/auth.js";
import {CreatePost} from "../controllers/items.js";
import {getAllPosts} from "../controllers/items.js";
import {deletePost} from "../controllers/items.js";

const router = express.Router();

router.post("/CreatePost", auth, CreatePost);
router.get("/get", getAllPosts);
router.delete("/delete", deletePost);

export default router;
