import express from 'express';
import { authenticateToken } from '../common.js';
import { runCode, verdictCode } from '../Controller/CompilerController.js';

const CompilerRouter=express.Router();
CompilerRouter.post("/",runCode)



export default CompilerRouter;