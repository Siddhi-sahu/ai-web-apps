"use client"
import React from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';

type Props = {
    prompt: string;
    handlePromptChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    placeholder?: string;
    error ?: string;
    handlePromptSubmit: ()=> void;
}
const PromptInput = ({
    prompt,
    handlePromptChange,
    disabled,
    placeholder,
    error,
    handlePromptSubmit
}: Props) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            handlePromptSubmit();
        }

    }

  return (
     <div className="flex items-center w-full flex-col space-y-2">
      <div className="flex w-full">
        <Input 
        type='text' 
        onChange={handlePromptChange}
        value={prompt}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Type your message...."}
        />
        <Button 
        onClick={handlePromptSubmit}
        className='ml-2 bg-slate-600 border-white border-2'
        disabled={disabled}>Send</Button>

      </div>
      <p className="text-red-500 ml-2">{error}</p>
      </div>
  )
}

export default PromptInput