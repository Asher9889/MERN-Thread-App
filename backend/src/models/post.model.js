import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    // for post id mongo will automatic generate
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        reuired: true
    },
    text: {
        type: String,
        maxLength: 500, 
    },
    image: {
        type: String
    },
    likes:{
        // storing users id in a array then count the length
        type: [String],
        default: []
        

    },
    comment: {
        type: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                // not sure 
                userName:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true

                },
                text:{
                    type: String,
                    maxlength: 200,
                    required: true
                },
                userProfilePic: {
                    type: String,
                }
            }
        ]
    }
}, {timestamps: true})

const Post = mongoose.model("Post", postSchema);

export default Post;