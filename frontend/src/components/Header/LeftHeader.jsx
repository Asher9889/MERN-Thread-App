import threadLogo from "../../assets/light-logo.svg";
import { GoHomeFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
export default function LeftHeader() {

  const openNewPostCard = useSelector((state)=> state.appFunctionality.openNewPostCard)
  const user = useSelector((state)=> state.loggedUser.user)
  const navigate = useNavigate()


  function openNewPostPopupCard(){
    openNewPostCard((prev)=> !prev)
  }

  return (
    <div className=" fixed flex flex-col gap-6 justify-between items-center left-0  h-screen py-4 px-2">
      <div>
        <img className="w-8" src={threadLogo} alt="" />
      </div>
      <div className="text-3xl flex flex-col gap-10 text-white" >
        <span onClick={()=> navigate("/")} className="hover:bg-zinc-800  transition-all w-14 h-12 rounded-lg flex justify-center items-center cursor-pointer">
         <GoHomeFill />
        </span>
        
          <span onClick={openNewPostPopupCard} className="bg-zinc-800 transition-all text-gray-500 hover:text-white w-14 h-12 rounded-lg flex justify-center items-center cursor-pointer">
            <FaPlus />
          </span>
        
        <span onClick={()=> navigate(`/${user.userName}`)}  className="hover:bg-zinc-800 transition-all w-14 h-12 rounded-lg flex justify-center items-center cursor-pointer">
          <IoIosContact />
        </span>
      </div>
      <div  className="hover:bg-zinc-800 text-white transition-all w-14 h-12 rounded-lg flex justify-center items-center cursor-pointer">
      <MdMoreVert className="text-2xl" />

      </div>
    </div>
  );
}
