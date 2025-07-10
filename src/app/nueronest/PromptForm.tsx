"use client"

import { MessageType } from '@/components/Message'
import PromptInput from '@/components/PromptInput'
import ResponseAndSources from '@/components/ResponseAndSources'
import React, { useState } from 'react'

const PromptForm = () => {
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState("");
    //to avoid ai saying hello multiple times
    const [firstMsg, setFirstMsg] = useState(true);
    const [messages, setMessages] = useState<MessageType[]>([
        {
            text: "hii i am a bot. Ask me anything",
            type: "bot"
        },
        {
            text: "hii i am a user",
            type: "user"
        }
    ])

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
                body: JSON.stringify({prompt, firstMsg})
            });
            
            if(!response.ok){
                throw new Error(`An error occucured.Status: ${response.status}`)
            };

            const data = await response.json();
            console.log(data);
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
            setFirstMsg(false);

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