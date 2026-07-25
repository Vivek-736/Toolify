"use client";

import React, { useState } from "react";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { createChat, saveMessage } from "@/app/actions/chat";

export interface Message {
  role: "user" | "assistant";
  content: string;
  toolInvocations?: { title: string }[];
}

interface ChatContainerProps {
  chatId?: string;
  initialMessages?: Message[];
  welcomeContent?: React.ReactNode;
}

export function ChatContainer({ chatId, initialMessages = [], welcomeContent }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    
    // Optimistically add user message
    setMessages(newMessages);
    setIsLoading(true);

    const isNewChat = !chatId;
    const currentChatId = chatId || crypto.randomUUID();

    if (isNewChat) {
      window.history.replaceState(null, '', `/dashboard/${currentChatId}`);
      createChat(currentChatId, text).catch(console.error);
    }
    
    saveMessage(currentChatId, "user", text).catch(console.error);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to fetch chat response");
      }

      // Hide the loading indicator since we are about to stream the response
      setIsLoading(false);

      // Add empty AI response to start streaming into
      setMessages((prev) => [...prev, { role: "assistant", content: "", toolInvocations: [] }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = "";

      let aiMessageContent = "";
      let currentToolInvocations: { title: string }[] = [];

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() || "";
          
          for (const part of parts) {
            if (part.startsWith("data: ")) {
              const dataStr = part.slice(6);
              try {
                const data = JSON.parse(dataStr);
                if (data.type === "content") {
                  aiMessageContent += data.text;
                } else if (data.type === "tool") {
                  currentToolInvocations = [...currentToolInvocations, { title: data.title }];
                }
                
                // Update the last message in state
                setMessages((prev) => {
                  const updatedMessages = [...prev];
                  const lastIndex = updatedMessages.length - 1;
                  updatedMessages[lastIndex] = {
                    ...updatedMessages[lastIndex],
                    content: aiMessageContent,
                    toolInvocations: currentToolInvocations.length > 0 ? currentToolInvocations : undefined
                  };
                  return updatedMessages;
                });
              } catch (e) {
                console.error("Error parsing stream part", e);
              }
            }
          }
        }
      }

      // Save final AI message
      if (aiMessageContent) {
        saveMessage(currentChatId, "assistant", aiMessageContent).catch(console.error);
      } else {
        // If stream finished but content is empty, fallback
        setMessages((prev) => {
          const updatedMessages = [...prev];
          const lastIndex = updatedMessages.length - 1;
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            content: "The server is sleeping now, try again later."
          };
          return updatedMessages;
        });
        saveMessage(currentChatId, "assistant", "The server is sleeping now, try again later.").catch(console.error);
      }

    } catch (error) {
      console.error(error);
      setMessages((prev) => {
        const updatedMessages = [...prev];
        const lastIndex = updatedMessages.length - 1;
        // Check if the last message is the assistant placeholder we created
        if (updatedMessages[lastIndex]?.role === "assistant" && !updatedMessages[lastIndex].content) {
            updatedMessages[lastIndex] = {
                ...updatedMessages[lastIndex],
                content: "The server is sleeping now, try again later."
            };
            return updatedMessages;
        } else {
            return [
                ...prev, 
                { role: "assistant", content: "The server is sleeping now, try again later." }
            ];
        }
      });
      // Also attempt to save this error message to the DB so history is consistent
      saveMessage(currentChatId, "assistant", "The server is sleeping now, try again later.").catch(console.error);
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