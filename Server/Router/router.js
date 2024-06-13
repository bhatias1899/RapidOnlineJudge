import express from 'express';
import LoginRouter from './LoginRouter.js';
import UserRouter from './UserRouter.js';
import ProblemRouter from './ProblemRouter.js';
import CompilerRouter from './CompilerRouter.js';
import SubmissionRouter from './SubmissionRouter.js';



const router = express.Router();

router.use("/",LoginRouter)
router.use("/user", UserRouter)
router.use("/problems",ProblemRouter)
router.use("/run",CompilerRouter)
router.use("/submit",SubmissionRouter)





export default router;