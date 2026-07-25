import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatContainer, Message } from "@/components/chat/ChatContainer";

interface ChatPageProps {
  params: Promise<{
    chatId: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;
  
  const isYoutubeChat = chatId === "1";
  const title = isYoutubeChat ? "YouTube Summary: Next.js 15" : "Chat " + chatId;

  const initialMessages: Message[] = isYoutubeChat ? [
    { role: "user", content: "Summarize this video https://youtu.be/dQw4w9WgXcQ" },
    { role: "assistant", content: `**Here's a concise summary of the video:**\n\nThe video introduces the key features of Next.js 15, including improved performance, simplified data fetching, enhanced caching, and better developer experience. It also covers new APIs, routing improvements, and best practices for upgrading from previous versions.\n\n**Key Takeaways**\n- Next.js 15 focuses on performance and DX improvements.\n- New caching and data fetching APIs.\n- Better support for React Server Components.\n- Simplified routing and error handling.\n- Easier upgrades with codemods and migration tools.` }
  ] : [
    { role: "user", content: "Explain useEffect in React" },
    { role: "assistant", content: "useEffect is a React Hook that lets you synchronize a component with an external system. It takes two arguments: a setup function and an array of dependencies..." }
  ];

  return (
    <>
      <ChatHeader title={title} />
      <ChatContainer initialMessages={initialMessages} />
    </>
  );
}