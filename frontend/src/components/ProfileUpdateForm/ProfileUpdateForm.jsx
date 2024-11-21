import { useRef, useState } from "react";
import { useSelector } from "react-redux";
// import image from "../../assets/post1.png"

export default function ProfileUpdateForm() {
  const { name, userName, email, profilePic, bio } = useSelector(
    (state) => state.loggedUser.user
  );
  const [image, setImage] = useState();

  const [userInputs, setUserInputs] = useState({
    name,
    userName,
    email,
    profilePic,
    bio
  });
  const fileRef = useRef(null);

  // console.log(fileRef)

  function handleChangeAvatar(e) {
    e.preventDefault();
    fileRef.current.click();
  }
  // for image file handeling
  function handleFileChange(e) {
    // console.log(e)
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        console.log(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="bg-zinc-800 w-2/3 mx-auto p-6">
      <form className="flex flex-col gap-4 text-white">
        <p className="text-xl font-semibold">User Profile Edit</p>
        <div className="flex flex-row items-center gap-10">
          <img
            className="w-24 h-24 object-cover rounded-full"
            src={image}
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
            onChange={(e)=> setUserInputs({...userInputs, name: e.target.value})}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="userName">User name</label>
          <input
            className="h-10 px-2 bg-zinc-800 border-2 border-zinc-500 rounded outline-0"
            id="userName"
            type="text"
            value={userInputs.userName}
            onChange={(e)=> setUserInputs({...userInputs, userName: e.target.value})}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="h-10 px-2 bg-zinc-800 border-2 border-zinc-500 rounded outline-0"
            id="email"
            type="email"
            value={userInputs.email}
            onChange={(e)=> setUserInputs({...userInputs, email: e.target.value})}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bio">Bio</label>
          <textarea
            className="p-2 bg-zinc-800 border-2 border-zinc-500 rounded outline-0"
            name="bio"
            id="bio"
            value={userInputs.bio}
            onChange={(e)=> setUserInputs({...userInputs, bio: e.target.value})}
          ></textarea>
          {/* <text className="h-10 px-2 bg-zinc-800 border-2 border-zinc-500 rounded outline-0" id="bio" type="text" /> */}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="h-10 px-2 bg-zinc-800 border-2 border-zinc-500 rounded outline-0"
            id="bio"
            type="password"
            onChange={(e)=> setUserInputs({...userInputs, password: e.target.value})}
          />
        </div>
        <div className="flex flex-row justify-between gap-4">
          <button className="flex-1 bg-red-500  py-2 rounded text-md font-bold">
            Cancel
          </button>
          <button className="flex-1 bg-green-500  py-2 rounded text-md font-bold">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
