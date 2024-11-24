import { useParams } from "react-router-dom"
import { UserPost, GetApp, Comment } from "../../components"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PostPage(){
    const [postData, setPostData] = useState(null);

    const {pid} = useParams();


    useEffect(()=>{
        postInfo();
    },[pid])

    async function postInfo(){
        try {
            const res = await fetch(`/api/v1/posts/${pid}`)
            const data = await res.json();

            setPostData(data.data);
            if(data.error){
                toast.error(data.error);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }
    return (
        <div>
            <UserPost post={postData}/>
            <GetApp />
            <Comment />
            <Comment />
        </div>
    )
};