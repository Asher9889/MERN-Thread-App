import avatar from "../../assets/zuck-avatar.png"
import { CiCircleMore } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { useState } from "react";

export default function UserHeader(){
    const [isCopyBtnActive, setIsCopyBtnActive] = useState(false);

    
    //  console.log(window)
    //  using window obj we can get URL
    
    
    function handleCopyBtn(){
        setIsCopyBtnActive(prev => !prev)
    }

    // For Copying to ClipBoard & Btn Close
    function handleCopyClick(){
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setIsCopyBtnActive(false)
    }


    return (
        <div className="flex flex-row justify-between w-full">
            <div className="w-2/3">
                <h1 className="text-[var(--white1-color)]  text-2xl font-semibold ">Saurabh Kushwaha </h1>
                <h3 className="text-lg text-zinc-400">username</h3>
                <p className="text-[var(--white2-color)] py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ratione, iusto nesciunt culpa repellat dolor voluptas, nemo dolorem molestias qui impedit, eveniet eum facere corporis.</p>
                <div className="text-[var(--white3-color)] flex flex-row items-center gap-2">
                    <p>3.2k followers </p>
                    <BsDot />
                    <button>instagram.com</button>
                </div>
            </div>
            <div className="flex flex-col  justify-between">
                <img className="w-20 rounded-full object-top" src={avatar} alt="" />
                <div className="relative flex  flex-row items-center text-[30px] text-white gap-4">
                    <button className="transition-colors hover:bg-zinc-700 w-10 h-10 flex justify-center items-center rounded-full"><FaInstagram className="" /></button>
                    <button onClick={handleCopyBtn} className="transition-colors hover:bg-zinc-700 w-10 h-10 flex justify-center items-center rounded-full"><CiCircleMore /></button>
                    {isCopyBtnActive && <ul className="absolute transition-colors  hover:bg-zinc-900 bg-zinc-800  px-4 pr-10 py-2 rounded-md text-black text-base -bottom-[100%] -right-[100%]">
                        <li onClick={handleCopyClick}><button className="text-white">Copy Link</button></li>
                    </ul>}
                </div>
            </div>
        </div>
    )
}