import { useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FaRetweet } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import avatar from "../../assets/zuck-avatar.png"
import heart from "../../assets/heart.svg"

export default function Comment(){

    const [isCommentLiked , setCommentLiked] = useState(false);

    function handleCommentLikeClick (){
        setCommentLiked(prev => !prev)
    }
    return (
        <div className="flex flex-row gap-4 text-white border-t-2 border-[var(--white3-color)] py-4">
            <div>
                <img className="w-8 h-8 rounded-full" src={avatar} alt="" />
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex flex-row justify-between">
                    <h4 className="text-lg font-semibold">ananya</h4>
                    <span className="flex flex-row items-center gap-3">
                        <p className="text-[var(--white3-color)]">2d</p>
                        <button><RxDotsHorizontal /></button>
                    </span>
                </div>

                <p>I love this post!! looks really cool</p>

                <div className="flex flex-row text-xl sm:text-2xl sm:gap-4 text-white   sm:py-2">
                    <button className=" w-8 h-8" onClick={handleCommentLikeClick} >{isCommentLiked ? <img className=" w-6 sm:w-7" src={heart} alt="heart"/> : <FaRegHeart className="w-7" />}</button>
                    <span className=" flex flex-row gap-2 sm:gap-4 pl-2 sm:-ml-[10px] ">
                        <button><FaRegComment /></button>
                        <button><FaRetweet /></button>
                        <button><FiSend /></button>
                    </span>
                </div>

                <p className="text-[var(--white3-color)]">{12 + (isCommentLiked ? 1 : 0 )} Likes</p>

            </div>
        </div>
    )
}