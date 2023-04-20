import { createContext, useContext, useEffect, useState } from "react";

import { useAuthContext } from "contexts/auth.context";
import { conversationsService, type Conversation } from "services/conversations.service";

interface ConversationsContext {
  callback: boolean;
  setCallback: React.Dispatch<React.SetStateAction<boolean>>;
  conversation: Conversation;
  setConversation: React.Dispatch<React.SetStateAction<Conversation>>;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

export const ConversationsContext = createContext<ConversationsContext>({} as ConversationsContext);

export const useConversationsContext = () => {
  const conversationsContext = useContext(ConversationsContext);
  if (!conversationsContext) throw new Error("Something went wrong with the React Context API!");
  return conversationsContext;
};

export const ConversationsContextProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [callback, setCallback] = useState(false);
  const [conversation, setConversation] = useState<Conversation>({} as Conversation);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const authContext = useAuthContext();

  useEffect(() => {
    if (!authContext.accessToken) return;

    const getConversations = async () => {
      try {
        const { data } = await conversationsService.getConversations(authContext.accessToken);
        setConversations(data);
      } catch (error: any) {
        alert(error.response.data.message);
      }
    };

    getConversations();
  }, [authContext.accessToken, callback]);

  const state: ConversationsContext = {
    callback,
    setCallback,
    conversation,
    setConversation,
    conversations,
    setConversations
  };

  return <ConversationsContext.Provider value={state}>{children}</ConversationsContext.Provider>;
};
