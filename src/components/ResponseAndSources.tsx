import React, { useEffect, useRef } from 'react'
type Props = {
    messages: string[],
    pngFile: string,
    maxMessages: number
}
const ResponseAndSources = ({messages, pngFile, maxMessages}: Props) => {
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(messageContainerRef.current){
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
        }
    },[messages]);
    
     return (
            <div ref={messageContainerRef}>
                { messages && messages.length > 0 && messages.map((index, msg) =>(
                        <div key={index}>
                            {msg}
                        </div>
                ))
                }

            </div>
  )
}

export default ResponseAndSources