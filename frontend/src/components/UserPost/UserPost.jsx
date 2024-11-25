import { useSelector } from "react-redux";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { RiMoreLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa6";
import { FaRetweet } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

export default function UserPost({ post: post_ }) {
  const [isLiked, setLiked] = useState(false);
  const [postOwner, setPostOwner] = useState(null);
  const [post, setPost] = useState(post_);

  const user = useSelector((state) => state?.loggedUser?.user);

  console.log("post is: " , post)

  // improvement for like and unlike if continouse press then it will improve
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    findPostOwner();
  }, [user, post]);

  async function findPostOwner() {
    try {
      const res = await fetch(`/api/v1/users/profile/${post?.postedBy}`);
      const user = await res.json();
      if (user.error) {
        return toast.error(user.error);
      }
      setPostOwner(user.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLikeAndUnlike() {
    if (!user) {
      return toast.error("Please Login first to like the post");
    }
    if (loading) return; // if already api call ongoing it will prevent again call
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/posts/like/${post?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data.error) {
        return toast(data.error);
      }
      setPost(data.data);
      // setLiked(!isLiked);
    } catch (error) {
      console.log("error is: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full border-b-2 border-[var(--white3-color)] h-fit  flex flex-row  py-5">
      <div className="flex   flex-col justify-between items-center">
        <img
          onClick={() => navigate(`/${postOwner?.userName}`)}
          className="cursor-pointer w-12 h-12 rounded-full "
          src={postOwner?.profilePic}
          alt=""
        />
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
          <h4
            onClick={() => navigate(`/${postOwner?.userName}`)}
            className="cursor-pointer font-bold"
          >
            {postOwner?.name}
          </h4>

          <span className="flex flex-row gap-2">
            <p className="text-[var(--white3-color)]">
              {/* {formatDistanceToNow(new Date (post && post.createdAt))} ago */}
            </p>
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
            onClick={() => navigate(`/${postOwner?.userName}/post/${post._id}`)}
          />
        </div>

        <div className="flex  flex-row text-xl sm:text-2xl sm:gap-4 text-white  pl-4 py-4 sm:py-6">
          <button className=" w-8 h-8" onClick={handleLikeAndUnlike}>
            {post?.likes?.includes(user._id)  ? (
              <IoHeart className="text-red-500  w-8 h-8" /> // Filled heart when liked
            ) : (
              <IoHeartOutline className="text-white  w-8 h-8" /> // Outline heart when not liked
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
          <button>{post?.likes?.length} likes</button>
        </div>
      </div>
    </section>
  );
}
