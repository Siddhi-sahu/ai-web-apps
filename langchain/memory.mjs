import { ChatOpenAI, OpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

const main = async () => {
  // 5. Memory
  const model = new ChatOpenAI({
    temperature: 0, 
    model: "gpt-4o-mini"
    // verbose: true,
  });

  const memory = new BufferMemory();
  const chain = new ConversationChain({ llm: model, memory });
  const input = "Hi! I'm Siddhi, i like icecream";
  const res = await chain.invoke({
    input,
  });

  console.log({ res });

  const input2 = "What do i like?";
  const res2 = await chain.invoke({
    input: input2,
  });
  console.log({ res2 });
};

main();

//tavilySearchApi