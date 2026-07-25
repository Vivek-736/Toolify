import { GraphState } from "./state";
import { StateGraph, END } from "@langchain/langgraph";
import { callModel, toolNode } from "./nodes";

// 1. Initialize the StateGraph with our state schema
const workflow = new StateGraph(GraphState)
  // 2. Add the nodes
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  // 3. Define the entry point
  .addEdge("__start__", "agent");

// 4. Determine if we should end or route to a tool
const shouldContinue = (state: typeof GraphState.State) => {
  const messages = state.messages;
  const lastMessage = messages[messages.length - 1] as any;
  
  // If there are tool calls, route to the tools node
  if (lastMessage && (lastMessage.tool_calls?.length || lastMessage.additional_kwargs?.tool_calls?.length)) {
    return "tools";
  }
  
  return END;
};

// 5. Add conditional edges from the agent
workflow.addConditionalEdges("agent", shouldContinue, {
  "tools": "tools",
  [END]: END,
});

// 6. After tools finish executing, return to the agent to synthesize the response
workflow.addEdge("tools", "agent");

// 7. Compile the graph
export const app = workflow.compile();
