"use client"
type Props = {
    data: string | null
}
const StreamResponse = ({data}: Props) => {    
     return (
            <div  className="w-full flex flex-col space-y-2 overflow-y-scroll max-h-[calc(100vh-250px)] no-scrollbar">
                {typeof data === "string" && <pre>{data}</pre>}
                

            </div>
  )
}

export default StreamResponse