
import Problem from "../Models/Problem.js";

export const createProblem =async (req,res)=>{
    try{
        const testcases=req.files.testcases[0].path;
        const solution=req.files.solution[0].path;
        const {title,status,difficulty,description}=req.body;
        
        const problem=await Problem.create({testcases,solution,title,status,difficulty,description})
        problem.solution=undefined;
        problem.testcases=undefined;
        res.status(200).json({problem});
    }catch(err){
        res.status(500).send({msg:"Internal Server Error",error:err});
    }
}

export const getProblems =async(req,res)=>{
    const problems=await Problem.find();
    problems.forEach(element => {
        element.solution=undefined;
        element.testcases=undefined;
    });
    res.json(problems);
}

export const getProblemById =async (req,res)=>{
    const _id=req.params.id;
    console.log(req.params)
    const problem=await Problem.findOne({_id});
    if(!problem) return res.status(400).send("Problem not found");
    
    res.json([problem]);
}

export const updateProblem =async (req,res)=>{
    const id=req.param
    const problem=await Problem.findOneAndUpdate({id},req.body,{new:true,useFindAndModify:false})
    if(!problem) return res.status(400).send("Problem Not Found")
    res.json(problem)
}

export const deleteProblem =async (req,res)=>{
    const id=req.param
    const user=await Problem.findOneAndDelete({id})
    if(!user) return res.status(400).send("Problem Not Found")
    res.send("Problem Deleted")
}


