"use client"
//get messages from getMessage api => fetch all messages using session Id, format them and save it into our state => in our useEffect we set our sessionId if it exists and we also fetch new messages=> when user sends a message(conversate) we set the sessionId only if it doenot exists
import { MessageType } from '@/components/Message'
import PromptInput from '@/components/PromptInput'
import ResponseAndSources from '@/components/ResponseAndSources'
import React, { useEffect, useRef, useState } from 'react'

const PromptForm = () => {
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState("");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const hasfetched = useRef(false);
    const [messages, setMessages] = useState<MessageType[]>([
        {
            text: "hii i am a bot. Ask me anything",
            type: "bot"
        },
        {
            text: "hii i am a user",
            type: "user"
        }
    ]);

    const fetchMessages = async(sid: string) =>{
        try{
            if(!hasfetched.current){
                const response = await fetch(`/api/getMessages?sessionId=${sessionId}`);
                const data = await response.json();
                console.log("data from getMessages",data);
                if(data.messages){
                    const formatedMessages: MessageType = data.messages.map((msg: any)=>(
                        {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            text: msg.kwargs.text,
                            type: msg.id.includes("HumanMessage") ? "user": "bot",

                        }

                    ));
                    setMessages((prevMessages) => [...prevMessages, ...formatedMessages]);

                }

            }
            

        }catch(e){
            console.error(e);
        }
    };

    useEffect(()=>{
        if(!sessionId){
            const localStorageId = localStorage.getItem("sessionId");
            if(localStorageId){
                setSessionId(localStorageId);
                fetchMessages(localStorageId);

            }
        };

        hasfetched.current = true;
        

    },[]);

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPrompt(e.target.value);
    }

    const handlePromptSubmit = async() => {
        console.log("submit", prompt);

        try{
            const response = await fetch("/api/neuronest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt, sessionId: localStorage.getItem("sessionId")})
            });
            
            if(!response.ok){
                throw new Error(`An error occucured.Status: ${response.status}`)
            };

            const data = await response.json();
            if(data.sessionId && !sessionId){
                localStorage.setItem("sessionId", data.sessionId);
            }
            setMessages([
                ...messages,
                {
                    text: prompt,
                    type: "user"
                },
                {
                    text: data.text.response,
                    type: "bot"
                }
            ]);

            setPrompt("")
            setError("")

        }catch(error){
            console.error(error);
            setError("Something went wrong! try again later.")
        }
    }

    return (
        <>
        <ResponseAndSources messages={messages}/>
        <PromptInput 
        prompt={prompt}
        handlePromptChange={handlePromptChange} 
        handlePromptSubmit={handlePromptSubmit} 
        disabled={false}
        error={error}
        />
        </>
    )
}

export default PromptForm