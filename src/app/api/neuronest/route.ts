//using redis to gauranteed persistence of messages
import { ChatOpenAI } from "@langchain/openai"
import { BufferMemory } from "langchain/memory"
import { ConversationChain } from "langchain/chains"
import {  NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getRedisClient } from "@/lib/redis";
import { RedisChatMessageHistory } from "@langchain/redis";



export async function POST(req: Request) {
        const { prompt, sessionId: existingSessionId } = await req.json();

        if(!prompt){
            return NextResponse.json({
                error: "Prompt is required"
            },{
                status: 400
            })
        };

        const redisClient = getRedisClient();
        if(!redisClient.isOpen){
            await redisClient.connect()
        }
        
        
        try{
            const model = new ChatOpenAI({
                model: "gpt-4o-mini",
                        temperature: 0
            });

            const sessionId = existingSessionId || uuidv4();
            
            const memory = new BufferMemory({
                chatHistory: new RedisChatMessageHistory({
                    sessionId,
                    sessionTTL: 300,
                    client: redisClient
                })
            })
            
            const chain = new ConversationChain({ llm: model, memory })
        

            const response = await chain.invoke({
                input: prompt
            });

            console.log(response)
            return NextResponse.json({ text : response, sessionId },
                {
                    status: 200
                }
            )

        }catch(error){
            console.error(error);
            return NextResponse.json({ error: "Something went wrong"},{ status: 500})
        }

    
}