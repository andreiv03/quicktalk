import axios from "./axios";
import type { MessageInterface } from "../interfaces/messages-interface";

class MessagesService {
  getMessages(token: string, channel: string) {
    return axios.get<MessageInterface[]>(`/messages/get/${channel}`, {
      headers: { authorization: token }
    });
  }
  
  postMessage(token: string, data: Omit<MessageInterface, "_id" | "createdAt">) {
    return axios.post<{ _id: string, createdAt: string }>("/messages/post", data, {
      headers: { authorization: token }
    });
  }
};

const messagesService = new MessagesService();
export default messagesService;