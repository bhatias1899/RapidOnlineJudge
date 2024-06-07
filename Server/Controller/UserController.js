import User from "../Models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { emailPattern, passwordPattern } from "../Constants.js";
import { logoutUser } from "./LoginController.js";

// Create User

export const createUser =async (req,res)=>{
    try {
        const {firstname,lastname,email,password,profession,contact}=req.body; // Get All data from request
        
        //Check if data exist
        if(!(firstname&&lastname&&email&&password&&profession&&contact)){
            return res.status(400).send("Invalid Request, Required values are missing");
        }
        // Validate the data
        if(!emailPattern.test(email)||!passwordPattern.test(password)){
            return res.status(400).send("Invalid Format Email or Password")
        }
    
        // checking if user already exist
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(200).send("User Already Exist")
        
    
        // hashing the password 
        const hashedPassword= await bcrypt.hash(password,10)
    
        const user=await User.create({
            firstname,
            lastname,
            profession,
            contact,
            email,
            password:hashedPassword
        })
        
        // token generation
        const token=jwt.sign({id:user._id,email},process.env.SECRET_KEY,{expiresIn:'1h'})
        user.token=token;
        user.password=undefined;
        res.status(200).json({message:"user successfully registered",user});
        
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
}

// Get User
export const getUser =async(req,res)=>{
    
    const email=req.user.email
    const user=await User.findOne({email})
    if(!user) return res.status(400).send("User Not Found")
    user.password=undefined
    res.json({user:user})
}

// Update User
export const updateUser =async(req,res)=>{
    const email=req.user.email
    const updatedEmail=req.body.email;
    if(!emailPattern.test(updatedEmail)){
        return res.status(400).send("Invalid Format Email")
    }
    const user=await User.findOneAndUpdate({email},req.body,{new:true,useFindAndModify:false})
    if(!user) return res.status(400).send("User Not Found")
    user.password=undefined
    res.json({user:user})
}

// Delete User
export const deleteUser =async(req,res)=>{
    const email=req.user.email
    const user=await User.findOneAndDelete({email})
    if(!user) return res.status(400).send("User Not Found")
    logoutUser(req,res);
}