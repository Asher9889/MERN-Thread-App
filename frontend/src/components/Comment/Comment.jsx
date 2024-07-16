import avatar from "../../assets/zuck-avatar.png"
import { RxDotsHorizontal } from "react-icons/rx";

export default function Comment(){
    return (
        <div className="flex flex-row border-t-2 border-[var(--white3-color)]">
            <div>
                <img className="w-8" src={avatar} alt="" />
            </div>
            <div>
                <div>
                    <h4>ananya</h4>
                    <span>
                        <p>2d</p>
                        <RxDotsHorizontal />
                    </span>
                </div>
            </div>
        </div>
    )
}