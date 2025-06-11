import { cn } from "@/lib/utils"
type SourceDocuments = {
    pageContent: string;
    metadata: Record<string, string>
}
type Props = {
    message: {
        text: string,
        type: "user" | "bot",
        sourceDocuments?: SourceDocuments[]
    },
    pngFile: string,
    isLast: boolean,
    
}
const Message = ({message, pngFile, isLast}: Props) =>{
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex">
            <p className={cn("max-w-[90%]", `${message.type === "user" ? "bg-zinc-800 rounded-3xl p-4 ml-auto" : ""}`)}>{message.text}</p>

            </div>

            {message.sourceDocuments && message.sourceDocuments.length > 0}
        </div>
    )

}

export default Message;