import img from "../../assets/zuck-avatar.png";
import post1 from "../../assets/post1.png";
import heart from "../../assets/heart.svg";
import { RiMoreLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FaRetweet } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPost({ post }) {
  const [isLiked, setLiked] = useState(false);
  const [postOwner, setPostOwner] = useState(null);
  const navigate = useNavigate();

  function handleLikeClick() {
    setLiked((prev) => !prev);
  }

  useEffect(() => {
    findPostOwner();
  }, [navigate,post]);

  async function findPostOwner() {
    try {  
     
        const res = await fetch(`/api/v1/users/profile/${post?.postedBy}`);
        const user = await res.json();
        setPostOwner(user.data)
      
    } catch (error) { 
      console.log(error);
    }
  }

  return (
    <section className="w-full border-b-2 border-[var(--white3-color)] h-fit  flex flex-row  py-5">
      <div  className="flex   flex-col justify-between items-center">
        <img onClick={()=> navigate(`/${postOwner?.userName}`)} className="cursor-pointer w-12 h-12 rounded-full " src={postOwner?.profilePic} alt="" />
        <div className="h-full flex-1 bg-[var(--white3-color)] w-[1.5px] my-2" />
        {/* <div className="relative w-full h-[50px]">
          <img
            className="w-5 h-5 absolute object-cover left-0 top-0 rounded-full"
            src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <img
            className="w-5 h-5 absolute rounded-full object-cover top-0 right-0 "
            src="https://images.unsplash.com/photo-1529408570047-e4414fb17e95?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <img
            className="w-5 h-5 absolute rounded-full object-cover bottom-0 translate-x-[50%] "
            src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div> */}
      </div>

      <div className="w-full">
        <div className="text-white pl-4 pr-2 flex flex-row justify-between">
          <h4  onClick={()=> navigate(`/${postOwner?.userName}`)} className="cursor-pointer font-bold">{postOwner?.name}</h4>

          <span className="flex flex-row gap-2">
            <p className="text-[var(--white3-color)]">1d</p>
            <button className="font-semibold text-xl ">
              <RiMoreLine />
            </button>
          </span>
        </div>

        <div className=" pl-4 pr-2 text-white">
          <p>{post?.text}</p>
          <img
            className="pt-4 object-cover rounded-md apect-video"
            src={post?.image}
            alt=""
            onClick={()=>navigate(`/${postOwner?.userName}/post/${post._id}`)}
          />
        </div>

        <div className="flex  flex-row text-xl sm:text-2xl sm:gap-4 text-white pl-4 py-4 sm:py-6">
          <button className=" w-8 h-8" onClick={handleLikeClick}>
            {isLiked ? (
              <img className=" w-6 sm:w-7" src={heart} alt="heart" />
            ) : (
              <FaRegHeart className="w-7" />
            )}
          </button>
          <span className=" flex flex-row gap-2 sm:gap-4 pl-2 sm:-ml-[10px] ">
            <button>
              <FaRegComment />
            </button>
            <button>
              <FaRetweet />
            </button>
            <button>
              <FiSend />
            </button>
          </span>
        </div>

        <div className=" text-[var(--white3-color)] pl-4 text-base   flex flex-row items-center gap-2">
          <p>{postOwner?.replies?.length} replies</p>
          <BsDot />
          <button>{post?.likes + (isLiked ? 1 : 0)} likes</button>
        </div>
      </div>
    </section>
  );
}
