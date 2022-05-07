import { createContext, useState, useEffect, useContext } from "react";

import { UsersContext } from "./users-context";
import type { ChannelInterface } from "../interfaces/channels-interfaces";

interface ProviderStateInterface {
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  currentChannel: [ChannelInterface, React.Dispatch<React.SetStateAction<ChannelInterface>>];
  publicChannels: ChannelInterface[];
};

export const ChannelsContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

export const ChannelsProvider: React.FC = ({ children }) => {
  const { token: [token] } = useContext(UsersContext);

  const [callback, setCallback] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<ChannelInterface>({} as ChannelInterface);
  const [publicChannels, setPublicChannels] = useState<ChannelInterface[]>([]);

  useEffect(() => {
    if (!token) return;
    
    const getPublicChannels = async () => {
      try {
        const { default: channelsService } = await import("../services/channels-service");
        const { data } = await channelsService.getChannels(token, "public");
        setPublicChannels(data);
      } catch (error: any) {
        return alert(error);
      }
    }

    getPublicChannels();
  }, [token, callback]);

  const state: ProviderStateInterface = {
    callback: [callback, setCallback],
    currentChannel: [currentChannel, setCurrentChannel],
    publicChannels
  };

  return (
    <ChannelsContext.Provider value={state}>
      {children}
    </ChannelsContext.Provider>
  );
}