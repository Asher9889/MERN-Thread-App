import mongoose from "mongoose";

async function ConnectDb(){
    try {
        const connect = await mongoose.connect(process.env.MONGO_ATLAS_URL)
        console.log("Connection Established :", connect.connection.host)
    } catch (error) {
        console.log(error)
    }
};

export default ConnectDb ;