import User from "../models/user.model.js";

export async function signupController(req, res){
    try {
        const {name, userName, email, password, bio} = req.body;
        const isUserAvailable = await User.findOne({$or: [{userName}, {email}]})
        

    } catch (error) {
        
    }
}











export async function loginController(req, res){
    try {
        
    } catch (error) {
        
    } 
}

