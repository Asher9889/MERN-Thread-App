import { useEffect, useState } from "react";
import { CreatePostBtn, CreatePostPopupCard, UserPost } from "../../components";
import { setNewPostCardFunction } from "../../utils/store/functionalitySlice";
import { useDispatch, useSelector } from "react-redux";
import PostPage from "../post-page/PostPage";

export default function HomePage() {
  const [showPostCardPopup, setPostCardPopup] = useState(false); // for displaying create post popup card
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();

  // Getting the function from Redux so that popup can occuers. i can use later
  const openNewPostCard = useSelector(
    (state) => state?.appFunctionality?.openNewPostCard
  );

  useEffect(() => {
    dispatch(setNewPostCardFunction(setPostCardPopup));
  }, []);

  useEffect(() => {
    getFeed();
  }, []);

    //   fetching user feed
  async function getFeed() {
    try {
      const res = await fetch("/api/v1/posts/feed");
      const response = await res.json();
      setPosts(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePostCardPopup() {
    openNewPostCard((prev) => !prev);
  }

  

//   if (posts?.data?.length === 0) {
//     return (
//       <h1 className="bg-red-800">Please follow others to see the posts</h1>
//     );
//   }

  if(!posts){
    return (
        <div className=" flex justify-center  pt-20 ">
            <div className="loader">

            </div>
        </div>
    )
  }

  return (
    <>
      <div className="py-4">
        <div className="">
          {showPostCardPopup && (
            <CreatePostPopupCard setPostCardPopup={setPostCardPopup} />
          )}
        </div>
        <div onClick={handlePostCardPopup}>
          <CreatePostBtn />
        </div>
        <div>{posts && posts.data.map((post) => <UserPost key={post._id} post={post} />)}</div>
      </div>
    </>
  );
}
