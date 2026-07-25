"use server";

import { db } from "@/config/db";
import { chatsTable, messagesTable, usersTable } from "@/config/schema";
import { eq, desc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { revalidatePath } from "next/cache";

// Helper to get the DB user ID from Clerk's current user
async function getUserDbId() {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");
  
  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) throw new Error("No email found for user");

  const dbUsers = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (dbUsers.length === 0) {
    throw new Error("User not found in database");
  }
  
  return dbUsers[0].id;
}

export async function getChats() {
  try {
    const userId = await getUserDbId();
    const chats = await db.select()
      .from(chatsTable)
      .where(eq(chatsTable.userId, userId))
      .orderBy(desc(chatsTable.updatedAt));
      
    return chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
}

export async function getMessages(chatId: string) {
  try {
    const messages = await db.select()
      .from(messagesTable)
      .where(eq(messagesTable.chatId, chatId))
      .orderBy(messagesTable.createdAt);
      
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

export async function getChat(chatId: string) {
  try {
    const chats = await db.select()
      .from(chatsTable)
      .where(eq(chatsTable.id, chatId));
    return chats[0] || null;
  } catch (error) {
    console.error("Error fetching chat:", error);
    return null;
  }
}

export async function createChat(chatId: string, firstMessage: string) {
  try {
    const userId = await getUserDbId();
    
    // Generate a quick title using Gemini
    let title = "New Chat";
    try {
      const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
        temperature: 0.7,
      });
      const response = await model.invoke(`Generate a short 3-5 word title for a chat that starts with this message. Do not use quotes or punctuation: "${firstMessage}"`);
      title = response.content.toString().trim().replace(/['"]+/g, '');
    } catch (e) {
      console.error("Failed to generate title, using default:", e);
    }

    // Save a short preview of the first message
    const preview = firstMessage.length > 60 ? firstMessage.substring(0, 60) + "..." : firstMessage;

    await db.insert(chatsTable).values({
      id: chatId,
      userId,
      title,
      preview,
    });
    
    revalidatePath("/dashboard");
    return { success: true, chatId, title };
  } catch (error) {
    console.error("Error creating chat:", error);
    return { success: false, error };
  }
}

export async function saveMessage(chatId: string, role: string, content: string) {
  try {
    // We generate a UUID for the message ID
    const messageId = crypto.randomUUID();
    
    await db.insert(messagesTable).values({
      id: messageId,
      chatId,
      role,
      content,
    });
    
    // Update the chat's updatedAt timestamp
    await db.update(chatsTable)
      .set({ updatedAt: new Date() })
      .where(eq(chatsTable.id, chatId));
      
    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/${chatId}`);
    return { success: true, messageId };
  } catch (error) {
    console.error("Error saving message:", error);
    return { success: false, error };
  }
}