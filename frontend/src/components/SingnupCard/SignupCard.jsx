import { useDispatch } from "react-redux";
import { setAuthScreen } from "../../utils/store/authScreenSlice";

export default function SignupCard() {
  const dispatch = useDispatch();

  function handleLogin(){
    dispatch(setAuthScreen("loginState"))
  }
  

  return (
    <div className="w-full bg-zinc-800 px-10 py-10 ">
      <p className="text-white text-2xl font-bold text-center">
        Login with your credentials
      </p>

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
            />
          </div>

          <button className="w-2/3 mt-6 h-10  rounded text-white bg-blue-500">
            Login
          </button>
        </div>
      </form>
      <p className="text-center mt-6 text-white ">
        Don't have an account? <span onClick={handleLogin} className="text-blue-500 cursor-pointer hover:underline"> Login</span>
      </p>
    </div>
  );
}
