# Memory — Phase 4: Tool Calling Completed

Last updated: 2026-07-25T13:02:40+05:30

## What was built

- **YouTube Transcript Tool (Task 09)**: Installed the `youtube-transcript` package. Created a custom `youtubeTranscriptTool` in `src/lib/agent/nodes.ts` to fetch YouTube captions without needing Google API keys.
- **UI Tool Indicator Updates**: Updated `src/app/api/chat/route.ts` to parse tool calls for `"youtube"` and return the text "Extracting transcript..." so the UI dynamically reflects the agent's actions before it answers.
- **Tool Routing (Task 10)**: Injected a central `SystemMessage` into `callModel` inside `nodes.ts`. This prompt explicitly defines the agent's available tools (`tavily_search` and `youtube_transcript`) and restricts it from guessing when a tool should be used, enabling intelligent routing.

## Decisions made

- Used the `youtube-transcript` package instead of LangChain's native `YoutubeLoader` as it works effortlessly on the server side without extra configuration.
- Rather than building a separate LangGraph router node to analyze prompts, we let Gemini 2.5 Flash route the intent internally using the `SystemMessage` instruction, adhering to the "Pure LangGraph routing" model using `bindTools`.

## Problems solved

- Ensured that large YouTube transcripts could be passed back directly to the model's large context window (Gemini 2.5 Flash), avoiding complex document chunking overhead for now.
- Solved potential hallucination routing issues by hard-coding strict tool descriptions in the system prompt.

## Current state

- **Phase 4 (Tool Calling) is 100% complete**. 
- The Chat UI now supports conversational interactions, real-time web searches, and YouTube video summarizations.

## Next session starts with

- **Phase 5: Chat Features**, starting with **Task 11: Streaming Responses**.
- We will need to figure out how to stream LangGraph output to the frontend to replace our current polling/waiting mechanism.

## Open questions

- None at this time.
