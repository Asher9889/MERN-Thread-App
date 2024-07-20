import User from "../models/user.model.js";
import { SuccessResponse, FailureResponse } from "../utils/index.js";

export async function signupController(req, res) {
  try {
    // object destructuring of request body
    const { name, userName, email, password } = req.body;
    console.log(req.body);

    // checking user already register or not
    // using userName and email
    if ([name, userName, email, password].some((input) => input == "")) {
      res
        .status(400)
        .json(new FailureResponse(false, 400, "All feilds are required", {}));
    }

    const isUserAvailable = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (isUserAvailable) {
      res
        .status(400)
        .json(new FailureResponse(false, 400, "User already Registered"));
    }

    // Now hassing user given password
    
    const user = User.create();


  } catch (error) {
    console.log("Error in Signup Controller")
    res.status(400).json(new FailureResponse(400, false, "Error Happen in Signup Controller", {}, error))
  }
}




export  async function loginController (){

}




