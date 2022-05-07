import mongoose, { Schema, SchemaOptions } from "mongoose";

interface ChannelInterface {
  _id: string;
  name: string;
  type: string;
};

const schemaOptions: SchemaOptions = {
  timestamps: true
};

const channelsSchema = new Schema<ChannelInterface>({
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