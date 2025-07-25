"use client"
import PromptInput from '@/components/PromptInput'
import StreamResponse from '@/components/StreamResponse'
import React, { useEffect, useRef, useState } from 'react'

const StreamForm = () => {
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState("");
    const [source, setSource] = useState<null | EventSource>(null);
    
    const [data, setData] = useState<null | string>(null);

    const sanitizeToken = (token: string) => {
        //Replace newLine characters and quotess
        return token.replace(/\\n/g, "\n").replace(/"/g, "");

    }

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
                body: JSON.stringify({ prompt })
            });

            if (source) {
                source.close()
            }
            //opens a streaming connection using EventSource to receive tokens from the backend in real time (as OpenAI streams them) and this sends a get req to server
            const newSource = new EventSource(`/api/streaming`);

            //also works
            // newSource.onmessage = (event) =>{
            //    const token = sanitizeToken(event.data);
            //     setData(token);
            // };

            newSource.addEventListener("newToken", (event)=>{
                console.log(event.data)
                const token = sanitizeToken(event.data);
                setData(token);
            })

            newSource.addEventListener("end", ()=>{
                console.log("end")
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