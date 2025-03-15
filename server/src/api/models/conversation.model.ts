import { model, Document, Schema, Types } from "mongoose";

export interface IConversation extends Document {
	isArchived: boolean;
	participants: Types.ObjectId[];
	type: "private" | "group";
}

const ConversationSchema = new Schema<IConversation>(
	{
		isArchived: {
			type: Boolean,
			default: false,
		},
		participants: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],
		type: {
			type: String,
			enum: ["private", "group"],
			default: "private",
		},
	},
	{
		timestamps: true,
	},
);

export const Conversation = model<IConversation>("Conversation", ConversationSchema);
