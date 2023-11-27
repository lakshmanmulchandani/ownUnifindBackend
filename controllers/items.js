import mongoose from "mongoose";

import Item from "../models/item.js";
import User from "../models/user.js";
import Report from "../models/report.js";
import Tag from "../models/tag.js";

// Create a post
export const createPost = async (req, res) => {
  const itemBody = req.body;
  const userId = req.userId;
  const userdata = await User.findById(userId);
  const newItem = new Item({ ...itemBody, user: userId });
  try {
    await newItem.save();
    const tag = await Tag.find({
      name: itemBody.itemTag
    })
    if(!tag || tag.length === 0) {
      console.log("No tag found" , itemBody.itemTag);
      const newtag = new Tag({
        name: itemBody.itemTag,
      })
      await newtag.save();
    }
    res.status(200).json({
      message: "Created a post successfully",
      post: newItem,
      user: userdata,
    });
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't create a post");
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log(_id);

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send({ message: error.message });
  }
  try {
    await Item.deleteOne({ _id: _id });
    res.status(200).json({ message: "successfully deleted..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  const { type, time } = req.query;
  console.log(req.query)
  console.log(type);
  try {
    const query = Item.find().populate("user").sort({
      createdAt:-1
    });
    if (type) query.where({ type: type });
    const itemList = await query;
    res.status(200).json({
      message: "OK",
      posts: itemList,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const itemId = req.params.itemid;
  try {
    const item = await Item.findById(itemId).populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
    res.status(200).json({
      message: "OK",
      data: item,
    });
  } catch (error) {
    res.status().json({ message: error.message });
  }
};

export const postComment = async (req, res) => {
  const { comment, postId } = req.body;
  console.log(comment, postId);
  if (!comment || !postId)
    return res.status(403).json({
      message: "Bad Request",
    });
  const userId = req.userId;
  try {
    const post = await Item.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: { comment: comment, user: userId } } }
    );
    res.status(200).json({
      message: "OK",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occurred!",
    });
  }
};

export const claimItem = async (req, res) => {
  const { itemId } = req.body;
  const userId = req.userId;
  if (!itemId)
    return res.status(403).json({
      message: "All fields are required",
    });
  try {
    let item = await Item.findById(itemId);
    item.status = "resolved";
    item.resolvedBy = userId;
    item.resolvedOn = Date.now();
    item = await item.save();
    res.status(200).json({
      message: "OK",
      data: item,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
export const report = async (req,res)=>{
  const {postId,description} = req.body;
  const userId = req.userId;

  try{
    const report = new Report({
      itemId: postId,
      reportedBy: userId,
      description: description
    })
    await report.save();
    return res.status(200).json({
      message: "OK",
    })
  }catch(err){
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const getTags = async (req, res)=>{
  const {q} = req.query;
  console.log(q)
  try{
    const tags = await Tag.find({ name: { "$regex": q, "$options": "i" }})
    res.status(200).json({
      tags: tags,
      message: "OK",
    })
  } catch(err){
    res.status(500).json({
      message: err.message
    })
  }
}
