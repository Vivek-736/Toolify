import { NextResponse } from "next/server";
import { HumanMessage, AIMessage, ToolMessage } from "@langchain/core/messages";
import { app } from "@/lib/agent/graph";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // Convert raw messages to Langchain message instances
    const langchainMessages = messages.map((m: any) => {
      if (m.role === "user") return new HumanMessage(m.content);
      if (m.role === "tool") return new ToolMessage({ content: m.content, tool_call_id: m.tool_call_id || "unknown" });
      
      const aiMsg = new AIMessage(m.content);
      if (m.tool_calls) {
        aiMsg.additional_kwargs = { tool_calls: m.tool_calls };
      }
      return aiMsg;
    });

    // Invoke the compiled LangGraph agent
    const finalState = await app.invoke({
      messages: langchainMessages
    });

    // Extract newly generated messages
    const newMessages = finalState.messages.slice(langchainMessages.length);
    
    // Check for tool invocations to pass to the frontend
    const toolInvocations: { title: string }[] = [];
    newMessages.forEach((msg: any) => {
      const toolCalls = msg.tool_calls || msg.additional_kwargs?.tool_calls || [];
      toolCalls.forEach((tc: any) => {
        const name = tc.function?.name || tc.name;
        if (name && name.includes("tavily")) {
          toolInvocations.push({ title: "Searching the web..." });
        } else if (name && name.includes("youtube")) {
          toolInvocations.push({ title: "Extracting transcript..." });
        } else {
          toolInvocations.push({ title: `Using tool: ${name}...` });
        }
      });
    });

    const lastMessage = finalState.messages[finalState.messages.length - 1];

    // Ensure content is a string
    let finalContent = "";
    if (typeof lastMessage.content === "string") {
      finalContent = lastMessage.content;
    } else if (Array.isArray(lastMessage.content)) {
      finalContent = lastMessage.content.map((c: any) => c.text || JSON.stringify(c)).join("\n");
    } else {
      finalContent = JSON.stringify(lastMessage.content);
    }

    return NextResponse.json({ 
      role: 'assistant', 
      content: finalContent,
      toolInvocations: toolInvocations.length > 0 ? toolInvocations : undefined,
      // We don't strictly need to return raw tool_calls for this simple implementation
      // because we just append the final assistant message to the frontend state.
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "An error occurred during chat generation." },
      { status: 500 }
    );
  }
}