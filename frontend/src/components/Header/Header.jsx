import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/store/userSlice";
import Dlogo from "../../assets/light-logo.svg" 



export default function Header (){
    const userName = useSelector((state)=> state?.loggedUser?.user?.userName)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function logoutUser(){
        await fetch("/api/v1/users/logout")
        localStorage.removeItem("thread-user");
        dispatch(removeUser());

    }
    return (
        <nav className="flex flex-row justify-center py-3">
            <button>
                <img className="w-8 " src={Dlogo} alt="" />
                <button onClick={()=> navigate("/update")} className="bg-red-800">Update</button>
                <button onClick={logoutUser} className="bg-yellow-500 p-2">Logout</button>
                <Link to={`/${userName}`}><button  className="bg-yellow-500 p-2">Profile</button></Link>
                <Link to={`/test101`}><button  className="bg-yellow-500 p-2">Profile 101</button></Link>
            
            </button>
        </nav>
    )
}