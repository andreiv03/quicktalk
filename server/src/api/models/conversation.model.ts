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

// Index for fetching conversations of a user
ConversationSchema.index({ participants: 1 });

// Index for fetching archived conversations of a user
ConversationSchema.index({ participants: 1, isArchived: 1 });

export const Conversation = model<IConversation>("Conversation", ConversationSchema);
