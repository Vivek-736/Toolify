import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatContainer, Message } from "@/components/chat/ChatContainer";
import { getChat, getMessages } from "@/app/actions/chat";
import { redirect } from "next/navigation";

interface ChatPageProps {
  params: Promise<{
    chatId: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;
  
  const chat = await getChat(chatId);
  if (!chat) {
    redirect("/dashboard");
  }
  
  const dbMessages = await getMessages(chatId);

  const initialMessages: Message[] = dbMessages.map(msg => ({
    role: msg.role as "user" | "assistant",
    content: msg.content
  }));

  return (
    <>
      <ChatHeader title={chat.title} />
      <ChatContainer chatId={chatId} initialMessages={initialMessages} />
    </>
  );
}