import { ChatOpenAI, OpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";
import SSE from "express-sse";

const sse = new SSE();
export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      {
        error: "Prompt is required",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const model = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0,
      streaming: true,
      //we are gonna recieve a tokem from openai as a callback and we are gonna send it through our sse package to the client with a custom event   ; straming: true makes openai send tokens and not wait for the full response
      callbacks: [
        {
            handleLLMNewToken(token: string){
                sse.send(token, "newToken")

            }
        }
      ]
    });

    //.then since .invoke returns a promise string; which means when the invoke is successfull we send an event to the frontend
    model.invoke(prompt).then(()=>{
      sse.send(null, "end")

    })

    return NextResponse.json({ result : "OK" },
        {
            status: 200
        }
    )
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// export async function GET(){
//   return NextResponse((RES))
// }