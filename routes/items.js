import express from "express";
import auth from "../middleware/auth.js";
import {claimItem, createPost, getPost, getTags, postComment} from "../controllers/items.js";
import {getAllPosts,deletePost,report} from "../controllers/items.js";

const router = express.Router();

router.post("/createpost", auth, createPost);
router.get("/getallposts", getAllPosts);
router.delete("/deletepost/:id", deletePost);
router.get("/getpost/:itemid", getPost);
router.post("/postcomment",auth,postComment);
router.post("/claimitem",auth,claimItem);
router.post("/report",auth,report);
router.get("/gettags",getTags);
export default router;
