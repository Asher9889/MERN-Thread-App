import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaImages } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_CHAR = 500;

export default function CreatePostPopupCard({ setPostCardPopup }) {
  const user = useSelector((state) => state?.loggedUser?.user);
  const [imageURL, setImageURL] = useState(null);
  const [reaminingChar, setRemainingChar] = useState(MAX_CHAR);
  const [postText, setPostText] = useState("");

  const [loading, setLoading] = useState(false);

  const [successPopup, setSuccessPopup] = useState(false); // State for success popup

  const imageRef = useRef(null);

  function handleImageClick(e) {
    // it will open input file explorer
    imageRef.current.click();
  }
  function useImageFromInput(e) {
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

  function handleRemoveImage() {
    setImageURL("");
  }

  function handleTextChange(e) {
    const textChar = e.target.value;
    if (textChar.length <= MAX_CHAR) {
      let remainingText = MAX_CHAR - textChar.length;
      setRemainingChar(remainingText);
      setPostText(textChar);
    } else {
      let inputText = textChar.slice(0, MAX_CHAR);
      setRemainingChar(0);
      setPostText(inputText);
    }
  }

  async function handlePostBtn() {
    // for avoiding the conflicts
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/v1/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          image: imageURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        return toast.error(data.error);
      }
      toast.success(data.success);
      setSuccessPopup(true);
      //   setPostCardPopup(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCloseSuccessPopup() {
    setSuccessPopup(false); // Close the success popup
    setPostCardPopup(false); // close  the post card
  }

  return (
    <div className="w-full border-[1px] rounded-lg  border-zinc-600 bg-zinc-800">
      {/* Pop up for success post */}
      {successPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" p-6 rounded shadow-lg text-center bg-zinc-800">
            <p className="text-lg font-semibold mb-4 text-white">
              Post successfully created!
            </p>
            <button
              onClick={handleCloseSuccessPopup}
              className="bg-zinc-900 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ends here */}
      <div className="flex flex-row justify-between  p-4 text-white border-b-[1px] border-zinc-600 ">
        <button onClick={() => setPostCardPopup(false)}>Cancel</button>
        <p className="font-semibold">New thread</p>
        <button>
          <PiDotsThreeVerticalBold className="text-xl" />
        </button>
      </div>
      <div className="w-full flex flex-row flex-1 gap-4 p-4">
        <img className="w-10 h-10 rounded-full" src={user?.profilePic} alt="" />
        <div className="flex flex-col flex-1 ">
          <p className="text-white font-semibold">{user.userName}</p>
          <div className="flex flex-col flex-1">
            <textarea
              value={postText}
              onChange={handleTextChange}
              className="bg-zinc-800 text-white text-sm  outline-0 rounded-md"
              placeholder="What's new?"
              name=""
              id=""
            ></textarea>
            <p className="text-end text-sm">
              {reaminingChar}/{MAX_CHAR}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-row gap-8">
        <FaImages
          onClick={handleImageClick}
          className="text-white text-xl  cursor-pointer"
        />

        <input
          onChange={useImageFromInput}
          accept="image/*"
          className="hidden"
          ref={imageRef}
          type="file"
        />
        <div className="flex-1 relative">
          {imageURL && (
            <>
              {" "}
              <img className="aspect-video" src={imageURL} alt="" />
              <span className="absolute right-2 top-2 bg-zinc-800 rounded px-2 py-1 ">
                <IoClose
                  onClick={handleRemoveImage}
                  className=" text-xl text-white cursor-pointer"
                />
              </span>{" "}
            </>
          )}
        </div>
      </div>
      <div className="w-full flex flex-row justify-end p-4">
        {!loading ? (
          <button
            onClick={handlePostBtn}
            className=" rounded bg-zinc-800 text-white px-4 py-2 border-[1px] border-zinc-600 text-md font-bold"
          >
            Post
          </button>
        ) : (
          <div className="loader"></div>
        )}
      </div>
      <ToastContainer theme="dark"  />
    </div>
  );
}
