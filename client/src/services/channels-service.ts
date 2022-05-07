import axios from "./axios";
import type { ChannelInterface, ChannelFormDataInterface } from "../interfaces/channels-interfaces";

class ChannelsService {
  getChannels(token: string, type: string) {
    return axios.post<ChannelInterface[]>("/channels/get", { type }, {
      headers: { authorization: token }
    });
  }

  createChannel(token: string, formData: ChannelFormDataInterface) {
    return axios.post<ChannelInterface>("/channels/create", formData, {
      headers: { authorization: token }
    });
  }
};

const channelsService = new ChannelsService();
export default channelsService;