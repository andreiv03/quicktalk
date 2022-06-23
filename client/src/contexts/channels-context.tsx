import { createContext, useState, useEffect, useContext } from "react";

import { UsersContext } from "./users-context";
import socket from "../services/socket";
import type { ChannelInterface } from "../interfaces/channels-interfaces";

interface ProviderStateInterface {
  currentChannel: [ChannelInterface, React.Dispatch<React.SetStateAction<ChannelInterface>>];
  publicChannels: ChannelInterface[];
};

export const ChannelsContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

export const ChannelsProvider: React.FC = ({ children }) => {
  const { token: [token] } = useContext(UsersContext);

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
        return alert(error.response.data.message);
      }
    }

    getPublicChannels();
  }, [token]);

  useEffect(() => {
    socket.on("create_channel", (newChannel: ChannelInterface) => {
      setPublicChannels((prevState: ChannelInterface[]) => [...prevState, newChannel]);
    });
  }, []);

  useEffect(() => {
    socket.on("delete_channel", (channelId: string) => {
      if (currentChannel._id === channelId) setCurrentChannel({} as ChannelInterface);
      setPublicChannels((prevState: ChannelInterface[]) => prevState.filter(channel => channel._id !== channelId));
    });
  }, [currentChannel]);

  const state: ProviderStateInterface = {
    currentChannel: [currentChannel, setCurrentChannel],
    publicChannels
  };

  return (
    <ChannelsContext.Provider value={state}>
      {children}
    </ChannelsContext.Provider>
  );
}