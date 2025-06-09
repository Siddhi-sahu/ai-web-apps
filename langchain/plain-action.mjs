import { ChatOpenAI } from "@langchain/openai";
import { SerpAPI } from "@langchain/community/tools/serpapi";
import { Calculator } from "@langchain/community/tools/calculator";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";

const main = async() => {
    // 4. Plan and Action agent
  const model = new ChatOpenAI({
    temperature: 0, // Temperature decides the randomness of the output
    modelName: "gpt-4o-mini", // This model is only for ChatOpenAI class
  });

  const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "Singapore",
      hl: "en",
      gl: "sg",
    }),
    new Calculator(),
  ];

  // The `PlanAndExecuteAgentExecutor` just takes the instruction and executes based on the tool
  const executor = await PlanAndExecuteAgentExecutor.fromLLMAndTools({
    llm: model,
    tools,
  });

  const resAgent = await executor.invoke({
    input: `Who is Kiran Dash from India currently living in Singapore? And what will be his age in 2030?`,
  });

  console.log({ resAgent });

}

main();