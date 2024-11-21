import { useState } from "react";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setAuthScreen } from "../../utils/store/authScreenSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../utils/store/userSlice";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  function visiblePassword() {
    setShowPassword(!showPassword);
  }

  async function handleLogin(e) {
    try {
      e.preventDefault();
      // console.log(inputs);
      const res = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const user = await res.json();
      if(user.error){
        return toast.error(user.error)
      }
      dispatch(setUser(user.data));
    } catch (error) {
      toast(error.error)
      console.log(error)
    }

    
  }

  function handleSignup() {
    dispatch(setAuthScreen("signupState"));
  }

  return (
    <div className="w-full bg-zinc-800 p-14 ">
      <p className="text-white text-2xl font-bold text-center">
        Login with your credentials
      </p>

      <form>
        <div className=" flex flex-col items-center gap-3  text-white   mt-[5%] ">
          <label className="w-2/3 text-xl" htmlFor="name">
            Email
          </label>
          <input
            className="w-2/3 h-10 rounded bg-zinc-800 border-zinc-500 border px-2 outline-none"
            type="text"
            id="name"
            required
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            value={inputs.name}
          />
          <label className="w-2/3 text-xl" htmlFor="name">
            Password
          </label>
          <div className="w-2/3 h-10 flex flex-row  items-center  bg-zinc-800 border-zinc-500 border rounded px-2">
            <input
              className="flex-1 h-full rounded bg-transparent outline-none"
              type={showPassword ? "text" : "password"}
              required
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              value={inputs.password}
            />
            <span onClick={visiblePassword}>
              {showPassword ? (
                <BiSolidShow className="text-xl cursor-pointer" />
              ) : (
                <BiSolidHide className="text-xl cursor-pointer" />
              )}
            </span>
          </div>
          <button
            onClick={handleLogin}
            className="w-2/3 mt-6 h-10  rounded text-white bg-blue-500"
          >
            Login
          </button>
        </div>
      </form>
      <p className="text-center mt-6 text-white ">
        Don't have an account?{" "}
        <span
          onClick={handleSignup}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          {" "}
          Sign Up
        </span>
      </p>
      <ToastContainer
        position="top-center"
        theme="dark"
      />
    </div>
  );
}
