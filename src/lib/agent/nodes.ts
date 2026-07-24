import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GraphState } from "./state";
import { RunnableConfig } from "@langchain/core/runnables";

// Initialize the Gemini model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// In Phase 4, we will bind actual tools here.
// const tools = [];
// const modelWithTools = model.bindTools(tools);
const modelWithTools = model;

/**
 * Node: callModel
 * Invokes the Gemini model with the current conversation history.
 */
export async function callModel(state: typeof GraphState.State, config?: RunnableConfig) {
  const { messages } = state;
  const response = await modelWithTools.invoke(messages, config);
  return { messages: [response] };
}