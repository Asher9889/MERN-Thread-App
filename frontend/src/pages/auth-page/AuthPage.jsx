import SignupCard from "../../components/SingnupCard/SignupCard";
import LoginCard from "../../components/Login/LoginPage";
import { useSelector } from "react-redux";


const AuthPage = () => {
  const authScreenSlice = useSelector((state)=> state?.authScreen?.value)
  
  return (
    <div className=" mt-[10%] ">
      {authScreenSlice == "loginState" ? <LoginCard /> : <SignupCard />}
      
    </div>
  );
};

export default AuthPage;
