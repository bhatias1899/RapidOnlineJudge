import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbConnection=async ()=>{
    const MongoUri=process.env.MONGODB_URL
    try{
        await mongoose.connect(MongoUri);
        console.log("Db connection established");
    }catch(error){
        console.log("error while connecting to mongodb", error)
    }
}
export default dbConnection;