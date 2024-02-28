"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "@/context/ChatContext";
import { dateFormat } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { fetchMessages } from "@/lib/fetch";
import { useInView } from "react-intersection-observer";
import Loading from "@/app/loading";

export default function Messages({ groupId }: { groupId: string }) {
  const searchParam = useSearchParams();
  const { socket, messages, setMessages } = useContext(ChatContext);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const chatContainer = chatRef.current;
    socket?.on("new-message", (data: MessageType) => {
      setMessages((prevMessage) => [...prevMessage, data]);
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });

    // * Listen when any user left/joined
    socket?.on("user-joined", (data: MessageType) => {
      setMessages((prevMessage) => [...prevMessage, data]);
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });

    socket?.on("left-group", (data: MessageType) => {
      setMessages((prevMessage) => [...prevMessage, data]);
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });
  }, [socket]);

  useEffect(() => {
    if (inView) {
      fetchMoreMessages();
    }
  }, [inView]);

  const fetchMoreMessages = async () => {
    const moreMsgs: MessageType[] | [] = await fetchMessages(groupId, page + 1);
    if (moreMsgs.length <= 0) {
      setNoMoreData(true);
    } else {
      setMessages((prevMessage) => [...moreMsgs, ...prevMessage]);
      setPage(page + 1);
    }
  };

  return (
    <div className="flex flex-col p-4 h-[90%] overflow-y-scroll" ref={chatRef}>
      {!noMoreData && (
        <div ref={ref}>
          <Loading />
        </div>
      )}
      {messages &&
        messages.length > 0 &&
        messages.map((item, index) => {
          if (item.type === 2)
            return (
              <div
                className="flex justify-center mb-2 bg-muted p-2 rounded-md "
                key={index}
              >
                <p>
                  <strong className="text-green-400">{item.name}</strong>{" "}
                  {item.message}
                </p>
                <p className="ml-2">{dateFormat(item.created_at)}</p>
              </div>
            );
          else if (item.type === 3) {
            return (
              <div
                className="flex justify-center mb-2 bg-muted p-2 rounded-md "
                key={index}
              >
                <p>
                  <strong className="text-red-400">{item.name}</strong>{" "}
                  {item.message}
                </p>
                <p className="ml-2">{dateFormat(item.created_at)}</p>
              </div>
            );
          } else if (item.name === searchParam.get("name") && item.type === 1) {
            return (
              <div className="flex justify-end mb-2" key={index}>
                <div className="bg-yellow-300 rounded-lg p-2 max-w-lg ml-10">
                  <h1 className="font-bold">{item.name}</h1>
                  <p className="text-md">{item.message}</p>
                  <p className="text-sm text-right">
                    {dateFormat(item.created_at)}
                  </p>
                </div>
              </div>
            );
          } else
            return (
              <div className="flex justify-start mb-2" key={index}>
                <div className="bg-green-300 rounded-lg p-2 max-w-lg mr-10">
                  <h1 className="font-bold">{item.name}</h1>
                  <p className="text-md">{item.message}</p>
                  <p className="text-sm text-right">
                    {dateFormat(item.created_at)}
                  </p>
                </div>
              </div>
            );
        })}
    </div>
  );
}
