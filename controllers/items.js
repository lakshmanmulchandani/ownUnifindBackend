import mongoose from "mongoose";

import Item from "../models/item.js";

// Create a post
export const CreatePost = async (req, res) => {
  const itemBody = req.body;
  console.log(itemBody)
  const newItem = new Item({...itemBody});
  try {
    
    await newItem.save();
 
    res.status(200).json("Created a post successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't create a post");
  }
};


export const deletePost = async (req, res) => {
  const {id: _id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send({message:error.message});
  }
  try {
    await Item.findByIdAndRemove(_id);
    res.status(200).json({message: "successfully deleted..."});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const itemList = await Item.find();
    res.status(200).json(itemList);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};
