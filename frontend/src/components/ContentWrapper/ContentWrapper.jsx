export default function ContentWrapper(props){
    return (
        <section className="max-w-[640px] mx-auto px-2">{props.children}</section>
    )
}