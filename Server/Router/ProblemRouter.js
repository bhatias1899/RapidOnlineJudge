import express from 'express';
import { createProblem, deleteProblem, getProblemById, getProblems } from '../Controller/ProblemController.js';
import { authenticateToken } from '../common.js';
import upload from '../Utils/upload.js';

const ProblemRouter=express.Router();
const handleUpload=upload.fields([{ name: 'testcases', maxCount: 1 }, { name: 'solution', maxCount: 1 }])
ProblemRouter.post("/create",handleUpload,authenticateToken,createProblem)
ProblemRouter.get("/",authenticateToken,getProblems)
ProblemRouter.get('/:id',authenticateToken, getProblemById)
ProblemRouter.get("/delete/:id",authenticateToken, deleteProblem)
export default ProblemRouter;
