import express from 'express';
import { loginUser, logoutUser } from '../Controller/LoginController.js';

const LoginRouter=express.Router();

LoginRouter.get("/hi",(req,res)=>{res.status(200).json('Everything is good')} )
LoginRouter.post("/login",loginUser)
LoginRouter.get("/logout", logoutUser)



export default LoginRouter;
