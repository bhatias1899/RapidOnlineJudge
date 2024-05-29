import express from 'express';
import { loginUser, logoutUser } from '../Controller/LoginController.js';

const LoginRouter=express.Router();

LoginRouter.post("/login",loginUser)
LoginRouter.get("/logout", logoutUser)

export default LoginRouter;
