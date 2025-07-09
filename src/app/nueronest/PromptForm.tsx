"use client"

import { MessageType } from '@/components/Message'
import PromptInput from '@/components/PromptInput'
import ResponseAndSources from '@/components/ResponseAndSources'
import React, { useState } from 'react'

const PromptForm = () => {
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState("");
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

    const handlePromptSubmit = () => {
        console.log("submit", prompt)
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