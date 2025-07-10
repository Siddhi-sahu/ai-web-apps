"use client"
import React, { useEffect, useRef } from 'react'
import Message, { MessageType } from './Message';
type Props = {
    messages: MessageType[]
}
const ResponseAndSources = ({messages}: Props) => {
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        //scroll to the bottom of the message container when new messages are added
        if(messageContainerRef.current){
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
        }
    },[messages]);
    
     return (
            <div ref={messageContainerRef} className="w-full flex flex-col space-y-2 overflow-y-scroll max-h-[calc(100vh-250px)] no-scrollbarˀ">
                { messages && messages.length > 0 && messages.map((message, index) =>(
                       <Message key={index} message={message} />
                ))
                }

            </div>
  )
}

export default ResponseAndSources