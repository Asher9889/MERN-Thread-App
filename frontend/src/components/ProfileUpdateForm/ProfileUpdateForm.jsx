import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../utils/store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import image from "../../assets/post1.png"

export default function ProfileUpdateForm() {
  const { name, userName, email, bio, _id, profilePic } = useSelector((state) => state?.loggedUser?.user );
  // name == user.name destrcuted
  const [imageURL, setImageURL] = useState();
  const [updating, setUpdating] = useState(false);

  const [userInputs, setUserInputs] = useState({
    name: name,
    userName: userName,
    email: email,
    bio: bio,
  });
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  function handleChangeAvatar(e) {
    e.preventDefault();
    fileRef.current.click();
  }
  // for image file handeling
  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageURL(e.target.result);
        // console.log(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  // handleProfileUpdateSubmit

  async function handleProfileUpdateSubmit(e) {
    if(updating) return;
    // it avoids double click
    setUpdating(true)
    try {
      e.preventDefault();
      const res = await fetch(`/api/v1/users/update/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userInputs, profilePic: imageURL }), //adding imgURl
      });
      const data = await res.json()
      if(data.error){
        return toast.error(data.error)
      }
      // dispatching updated user to store 
      dispatch(setUser(data.data));
      //  updating update use to local storage
      localStorage.setItem("thread-user", JSON.stringify(data?.data))

      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally{
      setUpdating(false);
    }
  }

  return (
    <div className="bg-zinc-800 w-2/3 mx-auto p-6">
      <form className="flex flex-col gap-4 text-white">
        <p className="text-xl font-semibold">User Profile Edit</p>
        <div className="flex flex-row items-center gap-10">
          <img
            className="w-24 h-24 object-cover rounded-full"
            src={imageURL ? imageURL : profilePic }
            alt="profile"
          />
          <button
            onClick={handleChangeAvatar}
            className="flex-1 bg-zinc-900 h-fit py-2 font-medium rounded"
          >
            Change Avatar
          </button>
          {/* accept prop for selecting image only */}
          <input
            onChange={handleFileChange}
            ref={fileRef}
            accept="image/*"
            className="hidden"
            type="file"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Full Name</label>
          <input
            className="h-10 px-2 bg-zinc-800 border-2 border-zinc-500 rounded outline-0"
            id="name"
            type="text"
            value={userInputs.name}
            onChange={(e) =>
              setUserInputs({ ...userInputs, name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="userName">User name</label>
          <input
            className="h-10 px-2 bg-zinc-800 border-2 border-zinc-500 rounded outline-0"
            id="userName"
            type="text"
            value={userInputs.userName}
            onChange={(e) =>
              setUserInputs({ ...userInputs, userName: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="h-10 px-2 bg-zinc-800 border-2 border-zinc-500 rounded outline-0"
            id="email"
            type="email"
            value={userInputs.email}
            onChange={(e) =>
              setUserInputs({ ...userInputs, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bio">Bio</label>
          <textarea
            className="p-2 bg-zinc-800 border-2 border-zinc-500 rounded outline-0"
            name="bio"
            id="bio"
            value={userInputs.bio}
            onChange={(e) =>
              setUserInputs({ ...userInputs, bio: e.target.value })
            }
          ></textarea>
          {/* <text className="h-10 px-2 bg-zinc-800 border-2 border-zinc-500 rounded outline-0" id="bio" type="text" /> */}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="h-10 px-2 bg-zinc-800 border-2 border-zinc-500 rounded outline-0"
            id="bio"
            type="password"
            onChange={(e) =>
              setUserInputs({ ...userInputs, password: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row justify-between gap-4">
          <button className="flex-1 bg-red-500  py-2 rounded text-md font-bold">
            Cancel
          </button>
          {updating ? 
          <div className="flex flex-1 justify-center items-center bg-green-500 rounded">
             <span class="loader "></span>
          </div>
           
          : <button
            className={"flex-1 bg-green-500  py-2 rounded text-md font-bold"}
            onClick={handleProfileUpdateSubmit}
          >
           Submit
          </button>}
          
        </div>
      </form>
      <ToastContainer theme="dark" />
    </div>
  );
}
