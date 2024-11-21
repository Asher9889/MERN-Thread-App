import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDb from "./db/connectDB.js";
import apiRoutes from "./routes/index.js"
import { v2 as cloudinary } from 'cloudinary'

// it can make available .env file in process object asap.
dotenv.config();

ConnectDb(); // for making connection to Database

/**
 * node is capable to create server using createServer() method
 * to simplify things we used express.js library
 * express is a middleware oriented library
 * after creating app obj from express every fn we write is a middleware
 * controller is a last middleware that's why in parameter we don't use next
 * 
 *
 * */
const app = express();


const Port = process.env.PORT || 8080

// Cloudinary configuration

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})


/**
 *sending data can be done in 3 forms
 * a) req.body
 * b) url params - not safe for sending data bcs it get exposed in url
 * c) query params - not safe for sending data bcs it get exposed in url
 */ 

//  by default express can not accept 
//  now express can accept json data
app.use(express.json({limit: "10mb"}));

//  this for parse encoded characters ex: space = %20
//  extended true means if body has nested data express will handel it
app.use(express.urlencoded({extended: true}));

// for parsing data coming from various sources
app.use(cookieParser());

app.use("/api", apiRoutes)



app.listen(Port, (req, res)=>{
    console.log("Server Started Using Port", Port)
})