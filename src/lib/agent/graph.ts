import { GraphState } from "./state";
import { StateGraph, END } from "@langchain/langgraph";
import { callModel } from "./nodes";

// 1. Initialize the StateGraph with our state schema
const workflow = new StateGraph(GraphState)
  // 2. Add the nodes
  .addNode("agent", callModel)
  // 3. Define the entry point
  .addEdge("__start__", "agent");

// 4. Determine if we should end or route to a tool (Phase 4 will add tool routing here)
// For now, the agent always just ends after generating a response.
const shouldContinue = (state: typeof GraphState.State) => {
  const messages = state.messages;
  const lastMessage = messages[messages.length - 1];
  
  // If there are tool calls, we would route to 'tools'
  if (lastMessage && lastMessage.additional_kwargs?.tool_calls?.length) {
    // return "tools"; // when we add tools
  }
  
  return END;
};

// 5. Add conditional edges
workflow.addConditionalEdges("agent", shouldContinue, {
  // "tools": "tools",
  [END]: END,
});

// 6. Compile the graph
export const app = workflow.compile();
