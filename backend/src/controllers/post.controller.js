import Post from "../models/post.model.js";
import Failureresponse from "../utils/FailureResponse.js";
import FailureResponse from "../utils/FailureResponse.js";
import SuccessResponse from "../utils/SuccessResponse.js";

export async function createPost(req, res) {
  let { text, image } = req.body;
  // we protected the route. middleware checks for cookie and decoded it then gets id. it makes request to db then finded user added to req object

  // logged in user given by middleware
  const { user } = req;
  if (!user) {
    return res
      .status(404)
      .json(new FailureResponse(404, "Please first login then try!!"));
  }
  let userID = user._id;
  let message = text;
  if ([userID, message].some((elem) => elem === "")) {
    return res
      .status(400)
      .json(400, "Post text and postedBy is mandatory to create post");
  }

  const newPost = new Post({ postedBy: userID, text: message });
  await newPost.save();
  return res
    .status(200)
    .json(new SuccessResponse(200, "Post is successfully created"));
}

export async function getPost(req, res) {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) {
      return res
        .status(404)
        .json(
          new Failureresponse(404, "Post not found. Please use correct post id")
        );
    }
    return res
      .status(200)
      .json(new SuccessResponse(200, "Post successfully fetched", post));
  } catch (error) {
    return res.status(404).json(new Failureresponse(404, error.message));
  }
}

export async function deletePost(req, res) {
  try {
    const deletedPost = await Post.findById(req.params.id);
    if (!deletePost) {
      return res
        .status(404)
        .json(
          new Failureresponse(404, "Post not found. Please use correct post id")
        );
    }
    if (deletedPost.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json(new Failureresponse(401, "you cannot delete another's post"));
    }

    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(500, "Server error");
    }
    // await deletePost.remove();
    return res
      .status(200)
      .json(new SuccessResponse(200, "Post successfully deleted"));
  } catch (error) {
    return res.status(500).json(new Failureresponse(404, error.message));
  }
}

export async function likeAndUnlike(req, res) {
  try {
    const { id: postId } = req.params;
    console.log("post id is ", postId);
    const userId = req.user._id;
    const post = await Post.findById(postId);
    console.log("post is: ", post);
    if (!post) {
      return res.status(404).json(new FailureResponse(404, "Post not found"));
    }

    if (post.likes.includes(userId)) {
      // unlike the post
      await Post.findByIdAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } }
      );
      return res
        .status(200)
        .json(new SuccessResponse(200, "Post successfully unliked"));
    } else {
      // like the post
      await Post.findByIdAndUpdate(
        { _id: postId },
        { $push: { likes: userId } }
      );
      return res
        .status(200)
        .json(new SuccessResponse(200, "Post successfully liked"));
    }
  } catch (error) {
    return res.status(500).json(new FailureResponse(500, error.message));
  }
}

// ------------ Comment in Post----------------
export async function commentToPost(req, res) {
  try {
    const { text } = req.body;
    if (text.trim().length < 1) {
      return res
        .status(400)
        .json(
          new FailureResponse(400, "Comment length should be greater than 1")
        );
    }
    const { id } = req.params;
    const { _id, userName, userProfilePic} = req.user;
    const data = {
      _id: _id,
      userName: userName,
      text: text,
      userProfilePic: userProfilePic || "",
    };
    const updatedPost = await Post.findByIdAndUpdate(id, {
      $push: { comment: data }
    });
    // console.log(updatedPost);
    if (!updatedPost) {
      return res.status(400).json(new FailureResponse(400, "Post not found"));
    }
    return res
      .status(200)
      .json(new SuccessResponse(200, "Comment successfully posted"));
  } catch (error) {
    return res
    .status(200)
    .json(new FailureResponse(500, error.message));
    
  }
}

// ------------- Feed Post --------------------
export async function getFeedPost(){
  
}
