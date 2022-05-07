export interface MessageInputDataInterface {
  channel: string;
  sender: string;
  text: string;
};

export interface MessageInterface extends MessageInputDataInterface {
  _id: string;
  createdAt: string;
};