import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is mandatory"],
        minLength: 6,
    },
    profilePic: {
        type: String,
        default: ""
    },
    followers: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    },
    bio: {
        type: String,
        default: ""
    },
    replies: {
        type: [],
    }

}, {timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;