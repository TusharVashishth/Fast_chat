"use client";
import React, { useState, useContext, useEffect } from "react";
import { Input } from "../ui/input";
import { useSearchParams, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ChatContext } from "@/context/ChatContext";
import { getMysqlTimestamp } from "@/lib/utils";

export default function ChatInput() {
  const searchParam = useSearchParams();
  const params = useParams();
  const [message, setMessage] = useState("");
  const { socket } = useContext(ChatContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchParam.get("name")) {
      socket?.emit(
        "message",
        {
          name: searchParam.get("name"),
          message: message,
          group_id: params?.id,
          created_at: getMysqlTimestamp(),
          type: 1,
        },
        params?.id
      );
      setMessage("");
    } else {
      toast.warning("Please add your name first", { theme: "colored" });
    }
  };
  return (
    <div className="relative bottom-4 left-0 right-0">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your message.."
          className="bg-muted h-12 border-none outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}
