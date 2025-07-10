import {ChatOpenAI} from "@langchain/openai"
import { BufferMemory } from "langchain/memory"
import { ConversationChain } from "langchain/chains"
import {  NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";

let model: ChatOpenAI;
let memory: BufferMemory;
let chain: ConversationChain;

export async function POST(req: Request) {
        const { prompt, firstMsg } = await req.json();

        console.log("Prompt", prompt)
        if(!prompt){
            return NextResponse.json({
                error: "Prompt is required"
            },{
                status: 400
            })
        }

        if(firstMsg){
            console.log("Initializing the chain")
            if(!model){
                model = new ChatOpenAI({
                    model: "gpt-4o-mini",
                    temperature: 0
                })
            };

            if(!memory){
                memory = new BufferMemory()
            }

            if(!chain){
                chain = new ConversationChain({llm: model, memory})
            }
        }

        try{
            const response = await chain.invoke({
                input: prompt
            });

            console.log(response)
            return NextResponse.json({ text : response },
                {
                    status: 200
                }
            )

        }catch(error){
            console.error(error);
            return NextResponse.json({ error: "Something went wrong"},{ status: 500})
        }

    
}