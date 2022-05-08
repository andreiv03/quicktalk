export interface ChannelFormDataInterface {
  creator: string;
  name: string;
  type: string;
};

export interface ChannelInterface extends ChannelFormDataInterface {
  _id: string;
};