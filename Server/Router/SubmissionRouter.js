import express from 'express';
import { authenticateToken } from '../common.js';
import { runCode, verdictCode } from '../Controller/CompilerController.js';

const SubmissionRouter=express.Router();
SubmissionRouter.post("/",verdictCode)



export default SubmissionRouter;