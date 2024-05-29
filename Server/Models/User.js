import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        default:null,
        required:true
    },
    lastname:{
        type:String,
        default:null,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        default:null,
        required:true,
        unique:true
    },
    profession:{
        type:String,
        default:null,
        required:true
    },
    contact:{
        type:String,
        default:null,
        required:true
    }
})

export default mongoose.model("user",userSchema);