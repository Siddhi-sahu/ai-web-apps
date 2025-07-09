import { cn } from "@/lib/utils"
type SourceDocuments = {
    pageContent: string;
    metadata: Record<string, string>
}

export type MessageType = {
        text: string,
        type: "user" | "bot",
        sourceDocuments?: SourceDocuments[]
}
type Props = {
    message: MessageType,
    
    
}
const Message = ({message}: Props) =>{
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex">
            <p className={cn("max-w-[90%]", `${message.type === "user" ? "bg-zinc-800 rounded-3xl p-4 ml-auto" : ""}`)}>{message.text}</p>

            </div>

            {message.sourceDocuments && message.sourceDocuments.length > 0 && (
                <div  className="flex flex-col space-y-2"> 
                {message.sourceDocuments.map((source, index) => (
                    <div key={index}>
                        <p> Number # {index}</p>
                        <p>{source.pageContent}</p>
                        <pre>{JSON.stringify(source.metadata, null, 2)}</pre>
                    </div>
                ))}
                </div>
            )
            } 
        </div>
    )

}

export default Message;