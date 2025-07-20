"use client"
import { MessageType } from '@/components/Message'
import PromptInput from '@/components/PromptInput'
import ResponseAndSources from '@/components/ResponseAndSources'
import StreamResponse from '@/components/StreamResponse'
import React, { useEffect, useRef, useState } from 'react'

const StreamForm = () => {
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState("");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const hasfetched = useRef(false);
    const [source, setSource] = useState<null | EventSource>(null);
    const [messages, setMessages] = useState<MessageType[]>([
        {
            text: "hii i am a bot. Ask me anything",
            type: "bot"
        }
    ]);
    const [data, setData] = useState<null | string>(null);

    const sanitizeToken = (token: string) => {
        //Replace newLine characters and quotess
        return token.replace(/\\n/g, "\n").replace(/"/g, "");

    }

    // const fetchMessages = async (sid: string) => {
    //     try {
    //         const response = await fetch(`/api/getMessages?sessionId=${sid}`);
    //         const data = await response.json();
    //         if (data.messages) {
    //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //             const formatedMessages: MessageType[] = data.messages.map((msg: any) => (
    //                 {
    //                     text: msg.kwargs.content,
    //                     type: msg.id.includes("HumanMessage") ? "user" : "bot",

    //                 }

    //             ));
    //             setMessages((prevMessages) => [...prevMessages, ...formatedMessages]);

    //         }

    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    // useEffect(() => {
    //     if (!hasfetched.current) {
    //         const localStorageId = localStorage.getItem("sessionId");
    //         if (localStorageId) {
    //             setSessionId(localStorageId);
    //             fetchMessages(localStorageId);

    //         }
    //     };

    //     hasfetched.current = true;

    // }, []);

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    }

    const handlePromptSubmit = async () => {

        try {
            await fetch("/api/streaming", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt, sessionId: localStorage.getItem("sessionId") })
            });

            if (source) {
                source.close()
            }
            const newSource = new EventSource(`/api/streaming`);

            // newSource.onmessage = (event) =>{
            //    const token = sanitizeToken(event.data);
            //     setData(token);
            // };

            newSource.addEventListener("newToken", (event)=>{
                const token = sanitizeToken(event.data);
                setData(token);
            })

            newSource.addEventListener("end", ()=>{
                newSource.close();
            })

            setPrompt("")
            setError("")

        } catch (error) {
            console.error(error);
            setError("Something went wrong! try again later.")
        }
    };

    useEffect(()=>{
        return ()=>{
            if(source){
                source.close();

            }

        }
    },[source])

    return (
        <>
            <StreamResponse data={data}/>
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

export default StreamForm