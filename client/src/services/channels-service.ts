import axios from "./axios";
import type { ChannelInterface } from "../interfaces/channels-interfaces";

class ChannelsService {
  getChannels(token: string, type: string) {
    return axios.get<ChannelInterface[]>(`/channels/get/${type}`, {
      headers: { authorization: token }
    });
  }

  createChannel(token: string, formData: Omit<ChannelInterface, "_id">) {
    return axios.post<ChannelInterface>("/channels/create", formData, {
      headers: { authorization: token }
    });
  }

  deleteChannel(token: string, channel: string) {
    return axios.delete<null>(`/channels/delete/${channel}`, {
      headers: { authorization: token }
    });
  }
};

const channelsService = new ChannelsService();
export default channelsService;