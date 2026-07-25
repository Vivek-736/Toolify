"use client";

import React, { useState } from "react";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

export interface Message {
  role: "user" | "assistant";
  content: string;
  toolInvocations?: { title: string }[];
}

interface ChatContainerProps {
  initialMessages?: Message[];
  welcomeContent?: React.ReactNode;
}

export function ChatContainer({ initialMessages = [], welcomeContent }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    
    // Optimistically add user message
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat response");
      }

      const data = await response.json();
      
      // Add AI response
      setMessages((prev) => [...prev, { 
        role: data.role, 
        content: data.content,
        toolInvocations: data.toolInvocations 
      }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {messages.length === 0 && welcomeContent ? (
        welcomeContent
      ) : (
        <MessageList messages={messages} isLoading={isLoading} />
      )}
      
      <div className="mt-auto">
        <ChatInput onSubmit={handleSubmit} disabled={isLoading} />
      </div>
    </>
  );
}