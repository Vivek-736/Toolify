import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { ChatInput } from "@/components/chat/ChatInput";

interface ChatPageProps {
  params: Promise<{
    chatId: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;
  
  const isYoutubeChat = chatId === "1";
  const title = isYoutubeChat ? "YouTube Summary: Next.js 15" : "Chat " + chatId;

  return (
    <>
      <ChatHeader title={title} />
      <MessageList />
      <div className="mt-auto">
        <ChatInput />
      </div>
    </>
  );
}