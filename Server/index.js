import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dbConnection from './Database/db.js';
import router from "./Router/router.js";



const app=express();
dbConnection();

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"http://localhost:3000",
    optionsSuccessStatus:200,
    credentials:true
}))
app.use(cookieParser());
app.use('/', router);

app.listen(5000,(req,res)=>{
    console.log("Listening to port 5000");
})

