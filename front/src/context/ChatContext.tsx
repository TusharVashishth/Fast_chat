"use client";
import React, {
  createContext,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
} from "react";
import { useSearchParams, useParams } from "next/navigation";
import { Socket, io } from "socket.io-client";
import ChatNameDialog from "@/components/chats/ChatNameDialog";
import { getMysqlTimestamp } from "@/lib/utils";

type ChatContextType = {
  messages: MessageType[] | [];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  socket: Socket | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
};

export const ChatContext = createContext<ChatContextType>({
  messages: [],
  setMessages() {},
  socket: null,
  setSocket() {},
});

export const ChatContextProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: MessageType[] | [];
}) => {
  const [messages, setMessages] = useState<MessageType[]>(data);
  const [socket, setSocket] = useState<Socket | null>(null);
  const seachParam = useSearchParams();
  const [open, setOpen] = useState(false);
  const params = useParams();
  let newSocket: Socket | null = null;

  const handleCallback = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (seachParam.get("name")) {
      newSocket = io("http://localhost:8000");
      setSocket(newSocket);

      newSocket.emit("join-room", params?.id, {
        group_id: params?.id,
        message: "Joined the group",
        created_at: getMysqlTimestamp(),
        type: 2,
        name: seachParam.get("name"),
      });
      newSocket.on("user-joined", (data) => {
        console.log("This joined ", data);
      });
    } else {
      setOpen(true);
    }

    return () => {
      newSocket?.emit("left-group", params?.id, {
        group_id: params?.id,
        message: "Left the group",
        created_at: getMysqlTimestamp(),
        type: 3,
        name: seachParam.get("name") ?? "Anon",
      });
      newSocket?.disconnect();
      setSocket(null);
    };
  }, []);
  return (
    <ChatContext.Provider value={{ messages, setMessages, socket, setSocket }}>
      <ChatNameDialog open={open} callback={handleCallback} />
      {children}
    </ChatContext.Provider>
  );
};
