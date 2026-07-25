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

    const eventStream = await app.streamEvents({ messages: langchainMessages }, { version: "v2" });
    
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of eventStream) {
            if (event.event === "on_chat_model_stream") {
              const chunk = event.data.chunk;
              if (chunk && chunk.content && typeof chunk.content === "string") {
                const payload = JSON.stringify({ type: "content", text: chunk.content });
                controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
              }
            } else if (event.event === "on_tool_start") {
              const name = event.name;
              let title = `Using tool: ${name}...`;
              if (name.includes("tavily")) title = "Searching the web...";
              if (name.includes("youtube")) title = "Extracting transcript...";
              
              const payload = JSON.stringify({ type: "tool", title });
              controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: "error", message: "Stream error occurred" })}\n\n`));
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "An error occurred during chat generation." },
      { status: 500 }
    );
  }
}