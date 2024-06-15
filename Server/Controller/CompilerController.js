import fs from 'fs';
import path from 'path';
import { exec, spawn} from 'child_process';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
import Problem from '../Models/Problem.js';

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
        return res.status(200).json({success:true,output});
    }catch(err){
        console.log("here its not fine ",err);
        res.status(200).send({success:false, err})
    }
    
}

export const verdictCode=async(req,res)=>{
    
    const{probId, language,code}=req.body;
    try{
        const {testcases,solution}=await Problem.findOne({_id:probId})
        const {filepath, inputfilepath}=await generateFile(language,code,"");
        const dirInputs=path.join(__dirname.split('\\Controller')[0],testcases);


        const dirSolution=path.join(__dirname.split('\\Controller')[0],solution);
        if(!path.basename(dirSolution).includes('.cpp')){
            fs.rename(dirSolution, `${dirSolution}.cpp`, function(err) {
                if ( err ) console.log('ERROR: ' + err);
            });
        }
        let userOutput=[];
        switch(language){
            case 'cpp':userOutput= await executeCpp(filepath,`${dirInputs}`); break;
            case 'c': userOutput= await executeC(filepath,`${dirInputs}`); break;
            case 'java':userOutput= await executeJava(filepath,`${dirInputs}`);break;
            case 'py':userOutput= await executePython(filepath,`${dirInputs}`);break;
            case 'js':userOutput= await executeJavaScript(filepath,`${dirInputs}`);break;
            default: userOutput= await executeCpp(filepath,`${dirInputs}`);  
        }
        let expectedOutput=await executeCpp(`${dirSolution}.cpp`,dirInputs);
        let output;
        output=userOutput.map((i,ind)=>i.stdout===expectedOutput[ind].stdout?{pass:true}:{pass:false})
        return res.status(200).json({success:true,output});
    }catch(err){
        return res.status(200).json({success:false, err});
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


const executeCpp = (filepath, inputFilePath) => {
    const dirOutput = path.join(__dirname, 'output');
    if (!fs.existsSync(dirOutput)) {
        fs.mkdirSync(dirOutput);
    }

    const filename = `${path.basename(filepath).split(".")[0]}.out`;
    const outPath = path.join(dirOutput, filename);

    return new Promise((resolve, reject) => {
        // Compile the C++ code
        exec(`g++ ${filepath} -o ${outPath}`, (err, stdout, stderr) => {
            if (err) {
                reject({ err, stderr });
                console.log("Compilation error",err);
                return;
            }
            if (stderr) {
                reject(stderr);
                console.log("Compilation stderr");
                return;
            }

            // Read the input file
            fs.readFile(inputFilePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Split the input data into test cases
                const testCases = data.split('\r\n');
                const results = [];
                
                console.log(testCases,"here are test cases")
                // Function to execute test cases sequentially
                const runTestCase = (index) => {
                    if (index >= testCases.length) {
                        resolve(results);
                        return;
                    }

                    const testCase = testCases[index];
                    const process = spawn(outPath);

                    let output = '';
                    let errorOutput = '';

                    process.stdout.on('data', (data) => {
                        output += data;
                    });

                    process.stderr.on('data', (data) => {
                        errorOutput += data;
                    });

                    process.on('close', (code) => {
                        if (code !== 0) {
                            results.push({ index, err: new Error(`Process exited with code ${code}`), stderr: errorOutput });
                            console.log(`Error in test case ${index + 1}`);
                        } else {
                            results.push({ index, stdout: output });
                        }
                        runTestCase(index + 1);
                    });

                    process.stdin.write(testCase);
                    process.stdin.end();
                };

                // Start executing test cases from the first one
                runTestCase(0);
            });
        });
    });
}

export const executeC=(filepath,input)=>{
    const dirOutput=path.join(__dirname,'output');
    if(!fs.existsSync(dirOutput)){
        fs.mkdirSync(dirOutput);
    }
    
    const filename=`${path.basename(filepath).split(".")[0]}.out`;
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
