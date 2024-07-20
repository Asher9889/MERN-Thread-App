import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

async function ConnectDb(){
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_ATLAS_URL}/${DB_Name}`)
        console.log("Connection Established with Thread DB :", connect.connection.host)
    } catch (error) {
        console.log(error)
    }
};

export default ConnectDb ;