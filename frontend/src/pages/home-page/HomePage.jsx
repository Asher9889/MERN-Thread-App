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

  if (!posts) {
    return <h1 className="bg-red-800">Loading...</h1>; // Loading state
  }

  if (posts?.data?.length === 0) {
    console.log("I am executed")
    return <h1 className="bg-red-800">Please follow others to see the posts</h1>;
  }


  return (
    <><div className="py-4">

    
      <div className="">
        {showPostCardPopup && (
          <CreatePostPopupCard setPostCardPopup={setPostCardPopup} />
        )}
      </div>
      <div onClick={handlePostCardPopup}>
        <CreatePostBtn />
      </div>
      <div>{posts && posts.data.map((post)=> (
            <UserPost post={post}  />
      )) }</div>
      </div>
    </>
  );
}
