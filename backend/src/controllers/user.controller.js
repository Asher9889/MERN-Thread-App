import mongoose from "mongoose";
import User from "../models/user.model.js";
import Failureresponse from "../utils/FailureResponse.js";
import {
  SuccessResponse,
  FailureResponse,
  generateTokenAndSetCookie,
} from "../utils/index.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

// <-------------- singnUp logic ----------->

export async function signupController(req, res) {
  try {
    // object destructuring of request body
    const { name, userName, email, password } = req.body;

    // checking user already register or not using userName and email
    if ([name, userName, email, password].some((input) => input == "")) {
      return res
        .status(400)
        .json(new FailureResponse(false, "All feilds are required", {}));
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
      profilePic: "",
      bio: "",
    });

    // checking user is created or not successfully
    const createdUser = await User.findOne({ userName: userName });

    if (createdUser) {
      const { _id, name, userName, email, profilePic, bio } = createdUser;
      // generating token then adding to cookie storage
      generateTokenAndSetCookie(_id, res);
      return res.status(200).json(
        new SuccessResponse(200, "User successfully registered", {
          _id: _id,
          name: name,
          userName: userName,
          email: email,
          profilePic: profilePic,
          bio: bio,
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
    const { email, password } = req.body;

    // if any element is empty it will return TRUE
    if ([email, password].some((element) => element == "")) {
      return res
        .status(400)
        .json(new Failureresponse(400, "Please provide details"));
    }

    // checking provided username is already exists in Db or not
    const user = await User.findOne({ email: email });
    console.log(user);
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
          profilePic: user.profilePic,
          bio: user.bio,
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

export async function logoutController(req, res) {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };
    res.clearCookie("token", options);
    return res
      .status(200)
      .json(new SuccessResponse(200, "User logged out successfully"));
  } catch (error) {
    return res
      .status(400)
      .json(new FailureResponse(400, "User not logged out"));
  }
}

// <--------------- followOrUnFollowuser ------------>

export async function followAndUnFollowUserController(req, res) {
  //
  const followedUser = req.params.id;
  const loggedInUser = req.user._id;
  if (loggedInUser === followedUser) {
    return res
      .status(400)
      .json(new FailureResponse(400, "Can not follow or Unfollow yourself."));
  }
  const isFollowing = req.user.following.includes(followedUser);
  if (!isFollowing) {
    // push operator for adding the value
    const updatedLoggedInUser = await User.findByIdAndUpdate(loggedInUser, {
      $push: { following: followedUser },
    });
    const updatedFollowedUser = await User.findByIdAndUpdate(followedUser, {
      $push: { followers: loggedInUser },
    });
    return res
      .status(400)
      .json(
        new SuccessResponse(400, "successfully started following")
      );
  } else {
    // removing followed user from logged in user
    // pull operator for removing the value
    const updatedLoggedInUser = await User.findByIdAndUpdate(loggedInUser, {
      $pull: { following: followedUser },
    });
    // removing loggedin user from followeduser
    const updatedFollowedUser = await User.findByIdAndUpdate(followedUser, {
      $pull: { followers: loggedInUser },
    });

    return res
      .status(200)
      .json(new SuccessResponse(200, "Successfully unfollowed"));
  }
}

// <---------------- updating profile logic ----------->
// when http request hit update route secureroute middleware get executed it search cookie from browser then parse it.
//  after parsing get an id. then search user with id. added user object in request object
export async function updateProfile(req, res) {
  const { name, userName, email, bio, password } = req.body;
  let { profilePic } = req.body; // updating image later
  // we added a middleware for secure route and added user obj in request object.
  try {
    const { _id } = req.user;
    // console.log(req.user);
    let user = await User.findById(_id);
    if (!user) {
      return res
        .status(400)
        .json(
          new FailureResponse(400, "User is not present. Please login first")
        );
    }
    // user._id is a object need to convert it to string
    if (req.params.id !== user._id.toString()) {
      return res
        .status(400)
        .json(new FailureResponse(400, "You Can not update others profile"));
    }

    // hasing given password
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      user.password = hashedPassword || user.password;
    }
    // saving profile pic into clodinary

    if (profilePic) {
      // first destroy exsting  pic stored inside cloudinary
      if(user.profilePic){
        await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
      }
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadResponse.secure_url;
      // console.log("profile pic upload res: ",profilePic);
      user.profilePic = profilePic || user.profilePic;
    }

    user.name = name || user.name;
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    // now saving the user provided details
    user = await user.save();
    // for response password should be null
    user.password = null;
    return res
      .status(200)
      .json(new SuccessResponse(200, "Profile successfully updated", user));
  } catch (error) {
    return res.status(400).json(new FailureResponse(400, error.message));
  }
}

// <----------------- getUserProfile ------------>

export async function getUserProfile(req, res) {
  try {
    const { username } = req.params;
    // console.log(req.params)
    let user;
    // console.log("query is ",query)
    if(mongoose.Types.ObjectId.isValid(username)){
      // here username is a id
      user = await User.findById({_id: username}).select("-password")
    }else{
      user = await User.findOne({ userName: username }).select("-password");
      console.log("i am executed")
    }
     console.log("User is", user)
    if (!user) {
      return res
        .status(400)
        .json(new FailureResponse(400, "User not found. Check username or id again"));
    } else {
      return res
        .status(200)
        .json(new SuccessResponse(200, "User successfully fetch", user));
    }
  } catch (error) {
    res.status(400).json(new FailureResponse(400, error.message));
  }
}