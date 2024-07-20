import Dlogo from "../../assets/light-logo.svg" 



export default function Header (){
    return (
        <nav className="flex flex-row justify-center py-3">
            <button>
                <img className="w-8 " src={Dlogo} alt="" />
            </button>
        </nav>
    )
}