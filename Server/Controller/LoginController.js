import User from "../Models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { emailPattern, passwordPattern } from "../Constants.js";


export const loginUser=async (req,res)=>{
    const{email,password}=req.body;
    if(!(email&&password)) return res.status(400).send("Invalid Request");

    // Validate the data
    if(!emailPattern.test(email)||!passwordPattern.test(password)){
        return res.status(400).send("Invalid Format Email or Password")
    }

    // checking if user already exist
     const existingUser= await User.findOne({email});
     if(!existingUser) return res.status(200).send("User doesnt Exist.")

    // matching password
    const passwordMatched=await bcrypt.compare(password,existingUser.password);
    if(!passwordMatched) return res.status(200).send("Invalid password");

    const token=jwt.sign({id:existingUser._id,email},process.env.SECRET_KEY,{expiresIn:'1h'})

    existingUser.password=undefined;

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: "None",
        maxAge: 3600000,
      });
      
    res.status(200).json({message:"logged in", user:existingUser});
    
}

export const logoutUser= (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'None',
    });
    res.status(200).json({ message: 'Logged out successfully' });
}