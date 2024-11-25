import avatar from "../../assets/zuck-avatar.png";
import { CiCircleMore } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserHeader({ user }) {
  const [isCopyBtnActive, setIsCopyBtnActive] = useState(false);

  const [follow, setFollow] = useState(false);

  const loggedUser = useSelector((state) => state?.loggedUser?.user);
//   console.log(loggedUser)

  //  console.log(window)
  //  using window obj we can get URL

  function handleCopyBtn() {
    setIsCopyBtnActive((prev) => !prev);
  }

  // For Copying to ClipBoard & Btn Close
  function handleCopyClick() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setIsCopyBtnActive(false);
  }

  async function handelFollowAndUnfollow(){
    try {
        const res = await fetch(`/api/v1/users/follow/${user._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  
            }
        })
        const result = await res.json();
        if(result.error){
            return toast(result.error)
        }
        // console.log(result);

        // simulating only client side for ui update
        let updatedFollowers;
        if(follow){
            updatedFollowers = user.followers.filter((id)=> id != loggedUser._id)
            
        }else{
          updatedFollowers = [...user.followers, loggedUser._id]; // Add loggedUser._id
        }
        user.followers = updatedFollowers;
        setFollow(!follow);
        
        toast.success(result.message);
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
      <div className="flex flex-row justify-between w-full">
        <div className="w-2/3 ">
          <h1 className="text-[var(--white1-color)] text-lg sm:text-2xl font-semibold ">
            {user.name}
          </h1>
          <h3 className="text-sm xs:text-base sm:text-lg text-zinc-400">
            {user.userName}
          </h3>
          <p className="text-[var(--white2-color)] text-sm xs:text-base sm:text-lg py-2">
            {user.bio}
          </p>

          {loggedUser._id == user._id ? <Link to={`/update`}>
            <button className="bg-zinc-800 p-1 text-white text-sm sm:text-md font-bold rounded px-2 mb-2">
              Update Profile
            </button>
          </Link> : 
            <button onClick={handelFollowAndUnfollow} className="bg-zinc-800 p-1 text-white text-sm sm:text-md font-bold rounded px-2 mb-2">
             {follow ? "Unfollow" : "Follow"}
            </button>
          }
          <div className="text-[var(--white3-color)] flex flex-row items-center xs:gap-2">
            <p className="text-sm xs:text-base">{user.followers.length} followers</p>
            <BsDot />
            <p className="text-sm xs:text-base">{user.following.length} following</p>
            <BsDot />
            <button className="text-sm xs:text-base">instagram.com</button>
          </div>
        </div>
        <div className="flex flex-col  justify-between">
          <img
            className="w-20 h-20 object-cover rounded-full object-top"
            src={user.profilePic}
            alt="profile pic"
          />
          <div className="relative flex  flex-row items-center text-[30px] text-white gap-4">
            <button className="transition-colors hover:bg-zinc-700 w-5 h-5 xs:w-10 xs:h-10 flex justify-center items-center rounded-full">
              <FaInstagram className="" />
            </button>
            <button
              onClick={handleCopyBtn}
              className="transition-colors hover:bg-zinc-700 w-6 h-6 xs:w-10 xs:h-10 flex justify-center items-center rounded-full"
            >
              <CiCircleMore />
            </button>
            <AnimatePresence>
              {isCopyBtnActive && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: 2 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute transition-colors  hover:bg-zinc-900 bg-zinc-800   sm:pr-2 md:pr-8 px-2 py-2 rounded-md text-black text-xs xs:text-sm sm:text-base -bottom-[125%] xs:-bottom-[100%] sm:-right-[60%] right-2"
                >
                  <li onClick={handleCopyClick}>
                    <button className="text-white">Copy Link</button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <nav className="flex flex-row border-b-[0.5px] border-[var(--white3-color)] sm:pt-4 pt-8 text-base text-white font-semibold">
        <div className="flex-1 text-center ">
          <button>Threads</button>
        </div>
        <div className="flex-1 text-center">
          <button>Replies</button>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}
