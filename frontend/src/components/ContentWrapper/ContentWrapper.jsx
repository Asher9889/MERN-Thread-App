export default function ContentWrapper(props){
    return (
        <section className="max-w-[640px] mx-auto">{props.children}</section>
    )
}