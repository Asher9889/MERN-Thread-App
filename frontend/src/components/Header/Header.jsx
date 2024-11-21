import { useNavigate } from "react-router-dom"
import Dlogo from "../../assets/light-logo.svg" 



export default function Header (){
    const navigate = useNavigate();
    return (
        <nav className="flex flex-row justify-center py-3">
            <button>
                <img className="w-8 " src={Dlogo} alt="" />
                <button onClick={navigate("/update")} className="bg-red-800">Update</button>
            </button>
        </nav>
    )
}