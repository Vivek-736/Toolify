import { NextResponse } from "next/server";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { app } from "@/lib/agent/graph";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const langchainMessages = messages.map((m: any) => {
      if (m.role === "user") return new HumanMessage(m.content);
      return new AIMessage(m.content);
    });

    const finalState = await app.invoke({
      messages: langchainMessages
    });

    const lastMessage = finalState.messages[finalState.messages.length - 1];

    return NextResponse.json({ 
      role: 'assistant', 
      content: lastMessage.content 
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "An error occurred during chat generation." },
      { status: 500 }
    );
  }
}