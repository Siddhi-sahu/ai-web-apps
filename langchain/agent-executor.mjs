// //now it is Langraph

// import { Calculator } from "@langchain/community/tools/calculator";
// import { SerpAPI } from "@langchain/community/tools/serpapi";
// import { OpenAI } from "@langchain/openai";
// import { initializeAgentExecutorWithOptions } from "langchain/agents";

// import { DadJokeAPI } from "@langchain/community/tools/dadjokeapi";


// const main = async() => {
//     const model = new OpenAI({
//     temperature: 0.9, 
//     // model: "gpt-4o-mini"
//   });

//   const tools = [
//     new SerpAPI(process.env.SerpAPI, {
//         location: "India",
//         hl: "en",
//         gl: "in"
//     }),
//     new DadJokeAPI(),
//   ]

//   const executor = await initializeAgentExecutorWithOptions(tools, model, {
//   agentType: "zero-shot-react-description",
//   verbose: true,
//   maxIterations: 5
// });

//    const res = await executor.invoke({
//   input: `Tell a joke about kids`,
// });

//    console.log({res});

// };


// main()
// import { Calculator } from "@langchain/community/tools/calculator";
import { SerpAPI } from "@langchain/community/tools/serpapi";
import { DadJokeAPI } from "@langchain/community/tools/dadjokeapi";
import { OpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
// import * as dotenv from "dotenv";

// dotenv.config(); // loads .env file

const main = async () => {
  const model = new OpenAI({
    temperature: 0.7,
    // modelName: "gpt-3.5-÷turbo", // or "gpt-4o"
  });

  const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "India",
      hl: "en",
      gl: "in",
    }),
    new DadJokeAPI(),
    // new Calculator(),
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "zero-shot-react-description",
  verbose: true,
  agentArgs: {
    prefix: `Answer the following question as best you can. You have access to the following tools:

    search: a search engine
    dadjoke: a dad joke generator
    calculator: a math calculator

    Use this format:

    Question: the input question
    Thought: always think before acting
    Action: one of [search, dadjoke, calculator]
    Action Input: the input to the action
    Observation: the result of the action
    ... (you can repeat Thought/Action/Action Input/Observation)
    Thought: I now know the final answer
    Final Answer: the answer to the original question`,
  },
  maxIterations: 5,
});


  const result = await executor.invoke({
    input: "Tell a joke about dogs",
  });

  console.log("\nFinal Result:\n", result);
};

main().catch(console.error);


 