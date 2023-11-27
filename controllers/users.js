import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { JWT_SECRET } from "../constants.js";


export const updateUser = async(req,res) =>
{
  try {
    const userData = req.body;
    console.log(userData);
    const id = req.params.id;
  
    await User.findOneAndUpdate({_id:id},userData);
    res.status(200).json({message : "User deleted successfully"});
  } catch (error) {
    console.log(error);
  }

}


export const getUser = async(req,res) =>
{
  try {
    const id  = req.userId;
   const user =  await User.findOne({_id:id});
   console.log("working")
    res.status(200).json({message : "User found",user});
    
  } catch (error) {
    console.log(error)
  }

}


export const deleteUser = async(req,res) =>
{
  try {
    const id = req.params.id;
    await User.findByIdAndDelete({_id:id});
    res.status(200).json({message : "User deleted successfully"});
    
  } catch (error) {
    console.log(error)
  }

}


export const userDetails = async(req,res)=>
{
  try {
    
    
    // console.log(req)
    const userId = req.userId;
    var existinguser = await User.findOne({_id:userId});
    const userName = req.body.userName;
    const phoneNO = req.body.phoneNO;
    const orgId = req.body.orgId;
    
   await existinguser.updateOne({phoneNO,orgId,userName});
    
    existinguser = await User.findOne({_id:userId});
    console.log(existinguser)
    res.status(200).json({message:"User information updated",existinguser})
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message);
  }
}

export const signup = async (req, res) => {
  console.log(req.body)
  const { userEmail, password} = req.body;
  

  try {
    const existinguser = await User.findOne({userEmail});
    if (existinguser) {
      return res.status(404).json({message: "User already Exist."});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ userEmail,password: hashedPassword});
    // Jwt token is created and sent back to browser as a response in json format
    const token = jwt.sign(
      {userEmail: newUser.userEmail, id: newUser._id},
      JWT_SECRET,
      {expiresIn: "1h"}
    );
    console.log(newUser)
    res.status(200).json({user: newUser, token});

  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  const {userEmail, password} = req.body;
  
  try {
    const existinguser = await User.findOne({userEmail});
 
    if (!existinguser) {
      console.log("Something went wrong")
     
      return res.status(400).json({message: "User doesn't Exist."});
    }

    const password_check = await bcrypt.compare(password, existinguser.password);
    if (!password_check) {
      return res.status(400).json({message: "Invalid credentials"});
    }
    // Jwt token is created and sent back to browser as a response in json format
    const token = jwt.sign(
      {userEmail: existinguser.userEmail, id: existinguser._id},
      JWT_SECRET,
      {expiresIn: "1h"}
    );
    
    res.status(200).json({user: existinguser, token});
  } catch (error) {
    res.status(500).json(error.message);
  }
};
