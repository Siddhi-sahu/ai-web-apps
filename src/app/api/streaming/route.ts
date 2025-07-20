import { OpenAI } from "@langchain/openai";
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
    const model = new OpenAI({
      model: "gpt-4o-mini",
      temperature: 0,
      streaming: true,
      callbacks: [
        {
            handleLLMNewToken(token: string){
                sse.send(token, "newToken")

            }
        }
      ]
    });

    // return NextResponse.json({ text : response },
    //     {
    //         status: 200
    //     }
    // )
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
