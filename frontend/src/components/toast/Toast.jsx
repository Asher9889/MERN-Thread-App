import { motion, AnimatePresence} from "framer-motion"
import { useState, useEffect } from "react"

export default function Toast({text}){

    const [isToastActive, setIsToastActive] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setIsToastActive(false);
        },7000)
    },[])

    return <>
        <AnimatePresence>{isToastActive && 
            <motion.div
                initial={{opacity: 0}}
                animate={{y: -10, opacity: 1}}
                transition={{ease: "linear", duration: 0.3}}
                exit={{opacity: 0, y:10}}
                className="w-[25vw] min-w-[200px] max-w-[300px]  min-h-[80px] bg-[var(--toast-color)] flex flex-col rounded-md   absolute left-[40%]    -translate-x-[50%]  bottom-4 ">
           
                <div className="toast h-[100%]  flex flex-row justify-start items-center       text-white  rounded-md">
                
                    <h1 className="py-4 px-6 text-xl font-bold">Lorem ipsum dolor </h1>
                </div>
            </motion.div>}
        </AnimatePresence>
     </>   
    
}