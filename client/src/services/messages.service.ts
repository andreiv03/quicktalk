import axios from "utils/axios";

export interface Message {
  _id: string;
  conversation: string;
  createdAt: string;
  sender: string;
  text: string;
}

class MessagesService {
  sendMessage(accessToken: string, message: Omit<Message, "_id" | "createdAt">) {
    return axios.post<{ _id: string; createdAt: string }>("/messages/message", message, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  getMessages(accessToken: string, conversation: string) {
    return axios.get<Message[]>(`/messages/conversation/${conversation}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}

export const messagesService = new MessagesService();
