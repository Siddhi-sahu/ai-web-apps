type TitleProps = {
    title: string
}
const Title = ({title}: TitleProps)=>{
    return <h1 className="text-center  text-4xl w-full">
        {title.toUpperCase()}
    </h1>
}

export default Title;