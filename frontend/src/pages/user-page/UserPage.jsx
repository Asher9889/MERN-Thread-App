import { UserHeader, UserPost } from "../../components"

export default function UserPage(){
    return (
        <section className="w-full ">
            <UserHeader />
            <UserPost />
            <UserPost />
            <UserPost />
        </section>
    )
}