import handWave from "../../assets/wave.svg"

export default function GetApp(){
    return (
        <div className="flex flex-row justify-between  py-4">
            <div className="flex flex-row items-center gap-4 text-[var(--white3-color)]">
                <img className="w-6 sm:w-8" src={handWave} alt="handWave" />
                <p className="text-sm xs:text-base">Get the app to like, reply and post.</p>
            </div>
            <button className="px-4 py-2 text-sm xs:text-base text-[var(--white2-color)] font-bold bg-[var(--black2-color)] transition hover:scale-[1.1] hover:font-dark  rounded-lg">Get</button>
        </div>
    )
}