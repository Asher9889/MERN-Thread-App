import User from "../models/user.model.js";
import Failureresponse from "../utils/FailureResponse.js";
import {
  SuccessResponse,
  FailureResponse,
  generateTokenAndSetCookie,
} from "../utils/index.js";
import bcrypt from "bcryptjs";

// <-------------- singnUp logic ----------->

export async function signupController(req, res) {
  try {
    // object destructuring of request body
    const { name, userName, email, password } = req.body;

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
      return res
        .status(400)
        .json(new FailureResponse(400, "User already Exists"));
    }

    // Now hassing user given password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // finally creating user in MongoDB
    const newRegisteredUser = await User.create({
      name: name,
      userName: userName,
      email: email,
      password: hashedPassword,
    });

    // checking user is created or not successfully
    const createdUser = await User.findOne({ userName: userName });

    if (createdUser) {
      const { _id, name, userName, email } = createdUser;
      // generating token then adding to cookie storage
      generateTokenAndSetCookie(_id, res);
      return res.status(200).json(
        new SuccessResponse(200, true, "User successfully registered", {
          _id: _id,
          name: name,
          userName: userName,
          email: email,
        })
      );
    } else {
      return res
        .status(400)
        .json(
          new FailureResponse(
            400,
            "Error happend during creating user!! Try Again"
          )
        );
    }
  } catch (error) {
    res.status(400).json(new FailureResponse(400, error.message));
  }
}

// <--------------- login logic ----------->
export async function loginController(req, res) {
  try {
    const { userName, password } = req.body;

    // if any element is empty it will return TRUE
    if ([userName, password].some((element) => element == "")) {
      return res
        .status(400)
        .json(new Failureresponse(400, "Please provide details"));
    }

    // checking provided username is already exists in Db or not
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(400).json(new FailureResponse(400, "User not found"));
    }

    // now checking password coorect or not
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (isPasswordCorrect) {
      // generating Token and saving it to browser cookie storage
      generateTokenAndSetCookie(user._id, res);
      // success reponse
      return res.status(200).json(
        new SuccessResponse(200, "user found", {
          _id: user._id,
          name: user.name,
          userName: user.userName,
          email: user.email,
        })
      );
    } else {
      return res.status(400).json(400, "No user found");
    }
  } catch (error) {
    res.status(400).json(new FailureResponse(400, error.message));
  }
}

// <--------------- logout logic --------------->

export async function logoutController(req, res){
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };
    res.clearCookie("token", options);
    return res.status(200).json(new SuccessResponse(200, "User logged out successfully"))
  } catch (error) {
    return res.status(400).json(new FailureResponse(400, "User not logged out"))
  }
} 

// <--------------- followOrUnFollowuser ------------>

export async function followAndUnFollowUserController(req, res){
  
}