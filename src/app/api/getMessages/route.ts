//get all data(messages) from redis using sessionId
//get redis client => open connection => pass the client/sessionId/sessionTTL to RedisChatMessageHistory => from history we get the message and pass it as response

import { getRedisClient } from "@/lib/redis";
import { NextResponse } from "next/server";
import { RedisChatMessageHistory } from "@langchain/redis"

export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");


    if(!sessionId){
        return NextResponse.json({
            msg: "Session Id is required."
        },{
            status: 404
        })
    };

    const redisClient = getRedisClient();
    if(!redisClient.isOpen){
        await redisClient.connect()
    }

    try{
        const history = new RedisChatMessageHistory({
            sessionId,
            sessionTTL: 300,
            client: redisClient
        });

        const messages = await history.getMessages();

        console.log("data from getMessages", messages);

        return NextResponse.json({ messages }, { status: 200})
     }catch(err){
        console.error(err);

        return NextResponse.json({
            error: "Internal Server error, An error occurred while fetching messages"
        },{
            status: 500
        });

    }

}