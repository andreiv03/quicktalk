import { createContext, useState, useEffect, useContext } from "react";

import { SystemContext } from "./system-context";
import { UsersContext } from "./users-context";
import { ChannelsContext } from "./channels-context";
import socket from "../services/socket";
import type { MessageInterface } from "../interfaces/messages-interface";

interface ProviderStateInterface {
  messages: [MessageInterface[], React.Dispatch<React.SetStateAction<MessageInterface[]>>];
};

export const MessagesContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

export const MessagesProvider: React.FC = ({ children }) => {
  const { createNewToast } = useContext(SystemContext);
  const { token: [token] } = useContext(UsersContext);
  const { currentChannel: [currentChannel] } = useContext(ChannelsContext);

  const [messages, setMessages] = useState<MessageInterface[]>([]);

  useEffect(() => {
    if (!token || !currentChannel._id) return;

    const getMessages = async () => {
      try {
        const { default: messagesService } = await import("../services/messages-service");
        const { data } = await messagesService.getMessages(token, currentChannel._id);
        setMessages(data);
      } catch (error: any) {
        return createNewToast(error, "error");
      }
    }

    getMessages();
  }, [token, currentChannel, createNewToast]);

  useEffect(() => {
    socket.on("send_message", (newMessage: MessageInterface) => {
      setMessages((prevState: MessageInterface[]) => [...prevState, newMessage]);
    });
  }, [setMessages]);

  const state: ProviderStateInterface = {
    messages: [messages, setMessages]
  };

  return (
    <MessagesContext.Provider value={state}>
      {children}
    </MessagesContext.Provider>
  );
}