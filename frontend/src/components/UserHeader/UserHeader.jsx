import avatar from "../../assets/zuck-avatar.png"
import { CiCircleMore } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"

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
        <>
        <div className="flex flex-row justify-between w-full">
            <div className="w-2/3">
                <h1 className="text-[var(--white1-color)] text-lg sm:text-2xl font-semibold ">Saurabh Kushwaha </h1>
                <h3 className="text-sm xs:text-base sm:text-lg text-zinc-400">username</h3>
                <p className="text-[var(--white2-color)] text-sm xs:text-base sm:text-lg py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ratione, iusto nesciunt culpa repellat dolor voluptas, nemo dolorem molestias qui impedit, eveniet eum facere corporis.</p>
                <div className="text-[var(--white3-color)] flex flex-row items-center xs:gap-2">
                    <p className="text-sm xs:text-base">3.2k followers</p>
                    <BsDot />
                    <button className="text-sm xs:text-base">instagram.com</button>
                </div>
            </div>
            <div className="flex flex-col  justify-between">
                <img className="w-20 rounded-full object-top" src={avatar} alt="" />
                <div className="relative flex  flex-row items-center text-[30px] text-white gap-4">
                    <button className="transition-colors hover:bg-zinc-700 w-5 h-5 xs:w-10 xs:h-10 flex justify-center items-center rounded-full"><FaInstagram className="" /></button>
                    <button onClick={handleCopyBtn} className="transition-colors hover:bg-zinc-700 w-6 h-6 xs:w-10 xs:h-10 flex justify-center items-center rounded-full"><CiCircleMore /></button>
                    <AnimatePresence>
                        {isCopyBtnActive && 
                            <motion.ul 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, y: 2}}
                                transition={{duration: 0.3}}
                                exit={{ opacity: 0 , y: -4 }} 
                                className="absolute transition-colors  hover:bg-zinc-900 bg-zinc-800   sm:pr-2 md:pr-8 px-2 py-2 rounded-md text-black text-xs xs:text-sm sm:text-base -bottom-[125%] xs:-bottom-[100%] sm:-right-[60%] right-2">
                                <li onClick={handleCopyClick}><button className="text-white">Copy Link</button></li>
                            </motion.ul>
                        } 
                    </AnimatePresence>
                </div>
            </div>

            
        </div>
        <nav className="flex flex-row border-b-[0.5px] border-[var(--white3-color)] sm:pt-4 pt-8 text-base text-white font-semibold">
            <div className="flex-1 text-center ">
                <button >Threads</button>
            </div>
            <div className="flex-1 text-center">
                <button>Replies</button>
            </div>
        </nav>
        </>
    )
}