import express from 'express';
import LoginRouter from './LoginRouter.js';
import UserRouter from './UserRouter.js';



const router = express.Router();

router.use("/",LoginRouter)
router.use("/user", UserRouter)

export default router;