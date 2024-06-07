import mongoose from "mongoose";

const problemSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        default:""
    },
    description:{
        type:String,
        required:true
    },
    testcases:{
        type:String,
        required:true

    },
    solution:{
        type:String,
        required:true
    },
    followUp:{
        type:String,
        default:""
    }

})

export default mongoose.model("problem",problemSchema);