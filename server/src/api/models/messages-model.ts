import mongoose, { Schema, SchemaOptions } from "mongoose";

export interface MessageInterface {
  _id: string;
  channel: string;
  createdAt: any;
  sender: string;
  text: string;
};

const schemaOptions: SchemaOptions = {
  timestamps: true
};

const messagesSchema = new Schema<MessageInterface>({
  channel: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    required: true,
    index: { expires: "1d" }
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