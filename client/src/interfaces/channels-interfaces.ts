export interface ChannelFormDataInterface {
  name: string;
  type: string;
};

export interface ChannelInterface extends ChannelFormDataInterface {
  _id: string;
};