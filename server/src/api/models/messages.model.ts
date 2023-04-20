import { model, Schema } from "mongoose";

export interface Message {
  _id: string;
  conversation: string;
  createdAt: any;
  sender: string;
  text: string;
}

const schema = new Schema<Message>(
  {
    conversation: {
      required: true,
      trim: true,
      type: String
    },
    createdAt: {
      index: {
        expires: "1d"
      },
      required: true,
      type: Date
    },
    sender: {
      required: true,
      trim: true,
      type: String
    },
    text: {
      required: true,
      trim: true,
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const MessagesModel = model<Message>("Messages", schema);
