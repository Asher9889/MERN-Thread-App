import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserHeader, UserPost } from "../../components"

export default function UserPage(){
    const [user, setUser] = useState(null);

    const { username } = useParams();
    
    useEffect(()=>{
        getUser();
    },[username])

    async function getUser(){
        try {
            const res = await fetch(`/api/v1/users/profile/${username}`)
            const user = await res.json();
            setUser(user.data);
        } catch (error) {
            console.log(error)
        }
    }

    if (!user) {
        // Show a loading state or a fallback UI while user data is being fetched
        // will show shimmer ui later
        return <p>Loading user data...</p>;
      }
    

    return (
        <section className="w-full ">
            <UserHeader user={user} />
            <UserPost />
            <UserPost />
            <UserPost />
        </section>
    )
}