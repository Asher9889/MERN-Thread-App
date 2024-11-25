import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Failureresponse from "../utils/FailureResponse.js";
import FailureResponse from "../utils/FailureResponse.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import { v2 as cloudinary } from "cloudinary";

export async function createPost(req, res) {
  try {
    let { text, image, postedBy } = req.body;
    // we protected the route. middleware checks for cookie and decoded it then gets id. it makes request to db then finded user added to req object

    // logged in user given by middleware
    const { user } = req;

    if (!user) {
      return res
        .status(404)
        .json(new FailureResponse(404, "Please first login then try!!"));
    }
    // userID from loggedIn
    let userID = user._id;

    if (userID.toString() !== postedBy.toString()) {
      return res
        .status(400)
        .json(new FailureResponse(404, "Unauthorized to create post."));
    }

    let message = text;
    if ([userID, message].some((elem) => elem == "")) {
      return res
        .status(400)
        .json(
          new FailureResponse(400, "Post text is mandatory to create post")
        );
    }

    if (image) {
      const res = await cloudinary.uploader.upload(image);
      // updated image cloudinary url
      image = res.secure_url;
    }
    let newPost = new Post({
      postedBy: userID,
      text: message,
      image: image || "",
    });
    await newPost.save();
    return res
      .status(200)
      .json(new SuccessResponse(200, "Post is successfully created", newPost));
  } catch (error) {
    return res.status(200).json(new FailureResponse(400, error.message));
  }
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
  

    const userId = req.user._id;
    let post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json(new FailureResponse(404, "Post not found"));
    }

    let updated_post;
    if (post.likes.includes(userId)) {
      // unlike the post
      updated_post = await Post.findByIdAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } },
        { new: true } // return updated data
      );
      // console.log("if liked post id found remove it")
      return res
        .status(200)
        .json(new SuccessResponse(200, "Post successfully unliked", updated_post));
    } else {
      // like the post
      updated_post = await Post.findByIdAndUpdate(
        { _id: postId },
        { $push: { likes: userId } },
        { new: true } // now will return upadted data
      );
      // console.log("if liked post id not found userID add it")
      return res
        .status(200)
        .json(new SuccessResponse(200, "Post successfully liked", updated_post));
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
    const { _id, userName, userProfilePic } = req.user;
    const data = {
      _id: _id,
      userName: userName,
      text: text,
      userProfilePic: userProfilePic || "",
    };
    const updatedPost = await Post.findByIdAndUpdate(id, {
      $push: { comment: data },
    });
    // console.log(updatedPost);
    if (!updatedPost) {
      return res.status(400).json(new FailureResponse(400, "Post not found"));
    }
    return res
      .status(200)
      .json(new SuccessResponse(200, "Comment successfully posted"));
  } catch (error) {
    return res.status(200).json(new FailureResponse(500, error.message));
  }
}

// ------------- Feed Post --------------------
export async function getFeedPosts(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json(new FailureResponse(404, "User Not Found. Login first"));
    }
    const following = user.following;
    // console.log("following: ", following);
    // user jisko bhi follow krega uski id nikali then post model mai search kiya.
    const posts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });
    console.log(posts);
    if (posts.length < 1) {
      return res
        .status(200)
        .json(
          new SuccessResponse(200, "No post is available. Please follow others",posts)
        );
    } 
      
    return res.status(200).json(new SuccessResponse(200,"Successfully fetchted the posts", posts));
    
  } catch (error) {
    return res.status(500).json(500, error.message);
  }
}
