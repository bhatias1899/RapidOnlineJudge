import express from 'express';
import { createUser, deleteUser, getUser, updateUser } from '../Controller/UserController.js';
import { authenticateToken } from '../common.js';

const  UserRouter = express.Router();


UserRouter.post("/register",createUser)
UserRouter.get("/profile",authenticateToken,getUser)
UserRouter.post("/updateuser",authenticateToken, updateUser)
UserRouter.get("/deleteUser",authenticateToken, deleteUser)

export default UserRouter;