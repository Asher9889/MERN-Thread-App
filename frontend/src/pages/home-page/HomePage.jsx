import { useState } from "react";
import { CreatePostBtn, CreatePostPopupCard } from "../../components";


export default function HomePage() {

  const [showPostCardPopup, setPostCardPopup] = useState(false);

  function handlePostCardPopup(){
    setPostCardPopup(!showPostCardPopup);
  }

  return (
    <>
      <div className="">
       {showPostCardPopup && <CreatePostPopupCard setPostCardPopup={setPostCardPopup}/>}
      </div>
      <div onClick={handlePostCardPopup}>
        <CreatePostBtn />
      </div>
        
    </>
  );
}
