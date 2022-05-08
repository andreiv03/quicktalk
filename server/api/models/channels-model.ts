import mongoose, { Schema, SchemaOptions } from "mongoose";

export interface ChannelInterface {
  _id: string;
  creator: string;
  name: string;
  type: string;
};

const schemaOptions: SchemaOptions = {
  timestamps: true
};

const channelsSchema = new Schema<ChannelInterface>({
  creator: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  }
}, schemaOptions);

const ChannelsModel = mongoose.model<ChannelInterface>("Channels", channelsSchema);
export default ChannelsModel;