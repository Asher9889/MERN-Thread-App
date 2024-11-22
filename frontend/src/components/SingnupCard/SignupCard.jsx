import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthScreen } from "../../utils/store/authScreenSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../utils/store/userSlice";

export default function SignupCard() {
  const [inputs, setInputs] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    profilePic: "",
    bio: ""
  });
  const dispatch = useDispatch();

  function handleLogin() {
    dispatch(setAuthScreen("loginState"));
  }

  async function handleSignupClick(e) {
    try {
      // console.log(inputs);
      e.preventDefault();
      // api request for signup
      const response = await fetch("/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const user = await response.json();

      // if user already exits
      if (user.error) {
        toast.error(user.error)
        return;
      }

      // setting user info into local storage
      localStorage.setItem("thread-user", JSON.stringify(user.data)) 
      // setting user into store
      dispatch(setUser(user.data))
     
     
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  return (
    <div className="w-full bg-zinc-800 px-10 py-10 ">
      <p className="text-white text-2xl font-bold text-center">Sign Up</p>

      <form>
        <div className=" flex flex-col items-center gap-6  text-white   mt-[5%] ">
          <div className="w-full flex flex-row gap-[10%] ">
            <div className="w-[45%] ">
              <label className=" text-xl" htmlFor="name">
                Full Name
              </label>
              <input
                className="w-full h-10 rounded bg-zinc-800 border-zinc-500 border px-2 outline-none"
                type="text"
                id="name"
                required
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                value={inputs.name}
              />
            </div>
            <div className="w-[45%] ">
              <label className=" text-xl" htmlFor="userName">
                Username
              </label>
              <input
                className="w-full h-10 rounded bg-zinc-800 border-zinc-500 border px-2 outline-none"
                type="text"
                id="userName"
                required
                onChange={(e) =>
                  setInputs({ ...inputs, userName: e.target.value })
                }
                value={inputs.userName}
              />
            </div>
          </div>
          <div className="w-full flex flex-col ">
            <label className="w-full text-xl" htmlFor="email">
              Email address
            </label>

            <input
              className="w-full h-10 rounded bg-zinc-800 border-zinc-500 border px-2 outline-none"
              type="email"
              id="email"
              required
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              value={inputs.email}
            />
          </div>
          <div className="w-full flex flex-col ">
            <label className="w-full text-xl" htmlFor="password">
              Password
            </label>

            <input
              className="w-full h-10 rounded bg-zinc-800 border-zinc-500 border px-2 outline-none"
              type="password"
              required
              id="password"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              value={inputs.password}
            />
          </div>

          <button
            className="w-2/3 mt-6 h-10  rounded text-white bg-blue-700 hover:bg-blue-500"
            onClick={handleSignupClick}
          >
            Sign up
          </button>
        </div>
      </form>
      <p className="text-center mt-6 text-white ">
        Don't have an account?{" "}
        <span
          onClick={handleLogin}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          {" "}
          Login
        </span>
      </p>
      <ToastContainer 
        position="top-center"
        // theme="dark"
      />
    </div>
  );
}
