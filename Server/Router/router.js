import express from 'express';
import LoginRouter from './LoginRouter.js';
import UserRouter from './UserRouter.js';
import ProblemRouter from './ProblemRouter.js';



const router = express.Router();

router.use("/",LoginRouter)
router.use("/user", UserRouter)
router.use("/problems",ProblemRouter)

export default router;