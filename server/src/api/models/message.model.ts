import { model, Document, Schema, Types } from "mongoose";

export interface IMessage extends Document {
	conversation: Types.ObjectId;
	sender: Types.ObjectId;
	text: string;
}

const MessageSchema = new Schema<IMessage>(
	{
		conversation: {
			type: Schema.Types.ObjectId,
			ref: "Conversation",
			required: true,
		},
		sender: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

// Automatically delete messages after 24 hours
MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export const Message = model<IMessage>("Message", MessageSchema);
