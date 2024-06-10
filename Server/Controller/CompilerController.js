import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const runCode=async(req,res)=>{
    const{language,code,input}=req.body;
    try{
        const {filepath, inputfilepath}=await generateFile(language,code,input);
        let output="";
        switch(language){
            case 'cpp':output= await executeCpp(filepath,inputfilepath); break;
            case 'c': output= await executeC(filepath,inputfilepath); break;
            case 'java':output= await executeJava(filepath,inputfilepath);break;
            case 'py':output= await executePython(filepath,inputfilepath);break;
            case 'js':output= await executeJavaScript(filepath,inputfilepath);break;
            default: output= await executeCpp(filepath,inputfilepath);  
        }
        res.status(200).json({output});
    }catch(err){
        console.log("here its not fine ",err);
        res.status(500).send({success:false, error:err})
    }
    
}


export const generateFile=async(language,code,input)=>{
    const dirCodes=path.join(__dirname,'codes');
    const dirInputs=path.join(__dirname,'inputs');
    if(!fs.existsSync(dirCodes)){
        fs.mkdirSync(dirCodes);
    }
    if(!fs.existsSync(dirInputs)){
        fs.mkdirSync(dirInputs);
    }
    const id=uuid();
    const filename=`${id}.${language}`;
    const inputfilename=`${id}.txt`;

    const filepath=path.join(dirCodes,filename);
    const inputfilepath=path.join(dirInputs,inputfilename);

     fs.writeFileSync(filepath,code);
     fs.writeFileSync(inputfilepath,input)
    return {filepath,inputfilepath};
}

// ${ input &&`< ${inputFile}`}

export const executeCpp=(filepath,input)=>{
    const dirOutput=path.join(__dirname,'output');
    if(!fs.existsSync(dirOutput)){
        fs.mkdirSync(dirOutput);
    }
    
    const filename=`${path.basename(filepath).split(".")[0]}.exe`;
    const outPath=path.join(dirOutput,filename);
    try{
        return new Promise((resolve,reject)=>{
            exec(`g++ ${filepath} -o ${outPath} && cd ${dirOutput} && .\\${filename} ${ input &&`< ${input}`} `,(err,stdout,stderr)=>{
                if(err){
                    reject({err,stderr});
                    console.log("problem lies here?? finally");
                }
                if(stderr){
                    reject(stderr);
                    console.log("problem lies here?? finally");
                }
                resolve(stdout);
            })
        });
    }


    catch(err){
        console.log(err,"problem lies here??")
    }

}

export const executeC=(filepath,input)=>{
    const dirOutput=path.join(__dirname,'output');
    if(!fs.existsSync(dirOutput)){
        fs.mkdirSync(dirOutput);
    }
    
    const filename=`${path.basename(filepath).split(".")[0]}.exe`;
    const outPath=path.join(dirOutput,filename);
    
    try{
        return new Promise((resolve,reject)=>{
            exec(`gcc ${filepath} -o ${outPath} && cd ${dirOutput} && .\\${filename} ${ input &&`< ${input}`} `,(err,stdout,stderr)=>{
                if(err){
                    reject({err,stderr});
                    console.log("problem lies here?? finally");
                }
                if(stderr){
                    reject(stderr);
                    console.log("problem lies here?? finally");
                }
                resolve(stdout);
            })
        });
    }


    catch(err){
        console.log(err,"problem lies here??")
    }

}

export const executeJava = (filepath, input) => {
    const dirOutput = path.join(__dirname, 'output');
    if (!fs.existsSync(dirOutput)) {
        fs.mkdirSync(dirOutput);
    }
    const className = path.basename(filepath).split(".")[0];
    
    console.log("calling java compiler",className)
    try {
        
        return new Promise((resolve, reject) => {
            exec(`javac ${filepath} -d ${dirOutput} && cd ${dirOutput} && java Main ${ input &&`< ${input}`}`, (err, stdout, stderr) => {
                if (err) {
                    reject({ err, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            });
        });
    } catch (err) {
        console.log(err, "problem lies here??");
    }
};

export const executePython = (filepath, input) => {
    const dirOutput = path.join(__dirname, 'output');
    if (!fs.existsSync(dirOutput)) {
        fs.mkdirSync(dirOutput);
    }
    
    try {
        
        return new Promise((resolve, reject) => {
            exec(`python ${filepath} ${ input &&`< ${input}`} `, (err, stdout, stderr) => {
                if (err) {
                    reject({ err, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            });
        });
    } catch (err) {
        console.log(err, "problem lies here??");
    }
};

export const executeJavaScript = (filepath, input) => {
    const dirOutput = path.join(__dirname, 'output');
    if (!fs.existsSync(dirOutput)) {
        fs.mkdirSync(dirOutput);
    }
    try {
        const inputFile = path.join(dirOutput, `${uuid()}.txt`);
        fs.writeFileSync(inputFile, input);
        return new Promise((resolve, reject) => {
            exec(`node ${filepath} < ${inputFile}`, (err, stdout, stderr) => {
                if (err) {
                    reject({ err, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            });
        });
    } catch (err) {
        console.log(err, "problem lies here??");
    }
};
