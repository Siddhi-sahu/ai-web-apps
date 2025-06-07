 
// import { SerpAPI } from "@langchain/community/tools/serpapi";
// import { DadJokeAPI } from "@langchain/community/tools/dadjokeapi";
// import { OpenAI } from "@langchain/openai";
// import { initializeAgentExecutorWithOptions } from "langchain/agents";

// const main = async () => {
//   const model = new OpenAI({
//     temperature: 0.7,
//     // modelName: "gpt-3.5-÷turbo", // or "gpt-4o"
//   });

//   const tools = [
//     new SerpAPI(process.env.SERPAPI_API_KEY, {
//       location: "India",
//       hl: "en",
//       gl: "in",
//     }),
//     new DadJokeAPI(),
//     // new Calculator(),
//   ];

//   const agentExecutor = await initializeAgentExecutorWithOptions(tools, model, {
//   agentType: "zero-shot-react-description",
//   verbose: true,
//   agentArgs: {
//     prefix: `Answer the following question as best you can. You have access to the following tools:

//     search: a search engine
//     dadjoke: a dad joke generator
//     calculator: a math calculator

//     Use this format:

//     Question: the input question
//     Thought: always think before acting
//     Action: one of [search, dadjoke, calculator]
//     Action Input: the input to the action
//     Observation: the result of the action
//     ... (you can repeat Thought/Action/Action Input/Observation)
//     Thought: I now know the final answer
//     Final Answer: the answer to the original question`,
//   },
//   maxIterations: 5,
// });


//   const result = await agentExecutor.invoke({
//     input: "Tell a joke about dogs",
//   });

//   console.log("\nFinal Result:\n", result);
// };

// main().catch(console.error);


import { SerpAPI } from "@langchain/community/tools/serpapi";
import { DadJokeAPI } from "@langchain/community/tools/dadjokeapi";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";



const main = async () => {
  const model =  new ChatOpenAI({
  model: "gpt-4o-mini"
});

  const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "India",
      hl: "en",
      gl: "in",
    }),
    new DadJokeAPI(),
  ];

  const agentExecutor = createReactAgent({
    llm: model,
    tools
  })

  const result = await agentExecutor.invoke({
    messages: [new HumanMessage("Tell a joke about dogs")],
  });

  // console.log("\nFinal Result:\n", result);

  const aiMessages = result.messages.filter((msg) => msg.getType?.() === "ai");
  const lastMessage = aiMessages[aiMessages.length - 1];

  console.log(lastMessage?.content); 

};

main().catch(console.error);


 