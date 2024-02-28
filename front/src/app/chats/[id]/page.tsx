import ChatHeader from "@/components/chats/ChatHeader";
import ChatInput from "@/components/chats/ChatInput";
import Messages from "@/components/chats/Messages";
import { ChatContextProvider } from "@/context/ChatContext";
import { fetchGroup, fetchMessages } from "@/lib/fetch";
import React from "react";

export default async function Chats({ params }: { params: { id: string } }) {
  const group: GroupType = await fetchGroup(params?.id);
  const messages: MessageType[] | [] = await fetchMessages(params.id);
  return (
    <div className="flex justify-center h-screen relative overflow-y-hidden">
      <div className="w-full lg:w-2/4 p-2">
        <ChatContextProvider data={messages}>
          <ChatHeader group={group} />
          <Messages groupId={params.id} />
          <ChatInput />
        </ChatContextProvider>
      </div>
    </div>
  );
}
