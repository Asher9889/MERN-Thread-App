import { FaPlus } from "react-icons/fa6";

export default function CreatePostBtn() {
  return (
    <div className="absolute bottom-10 right-10 w-20 h-16 hover:scale-[1.2] transition-transform border-[1px] border-zinc-600 bg-zinc-800 flex justify-center items-center rounded-xl cursor-pointer">
      <FaPlus className="text-3xl border-zinc-800b text-white" />
    </div>
  );
}
