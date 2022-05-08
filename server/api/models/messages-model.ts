import mongoose, { Schema, SchemaOptions } from "mongoose";

export interface MessageInterface {
  _id: string;
  channel: string;
  sender: string;
  text: string;
};

const schemaOptions: SchemaOptions = {
  timestamps: true
};

const messagesSchema = new Schema<MessageInterface>({
  channel: {
    type: String,
    trim: true,
    required: true
  },
  sender: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  }
}, schemaOptions);

const MessagesModel = mongoose.model<MessageInterface>("Messages", messagesSchema);
export default MessagesModel;