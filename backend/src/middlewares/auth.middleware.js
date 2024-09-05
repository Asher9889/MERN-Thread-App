import { FailureResponse } from "../utils/index.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Failureresponse from "../utils/FailureResponse.js";


export default async function protectedRoute(req,res, next){
    try {
        // some times we get cookie from request header
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            throw new Error("No token is available. First login")
        }
        // decoding jwt token getting from request object
        const verifingToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // removing password key from user object
        const user = await User.findById(verifingToken.user_id).select("-password")
        if(!user){
            return res.status(400).json(new Failureresponse(400, "Token is not valid"))
        }
        req.user = user;
        // calling the next function. basically everthing is function in node.js
        // controller is the last fn that's why we are not using next in controller function.
        next();

    } catch (error) {
        return res.status(400).json(new FailureResponse(400, error.message))
    }
}