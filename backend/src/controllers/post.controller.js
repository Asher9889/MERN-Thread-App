import Post from "../models/post.model.js";
import FailureResponse from "../utils/FailureResponse.js";
import SuccessResponse from "../utils/SuccessResponse.js";

export async function createPost(req,res){
    let { text, image } = req.body;
    // we protected the route. middleware checks for cookie and decoded it then gets id. it makes request to db then finded user added to req object

    // logged in user given by middleware
    const { user } = req;
    if(!user){
        return res.status(404).json(new FailureResponse(404, "Please first login then try!!"))
    }
    console.log("user is : " , user)
    let userID = user._id;
    let message = text;
    if([userID,message].some(elem => elem === "")){
        return res.status(400).json(400, "Post text and postedBy is mandatory to create post")
    }

    const newPost = new Post({postedBy: userID, text: message, });
    await newPost.save();
    return res.status(200).json(new SuccessResponse(200, "Post is successfully created"))
    
}