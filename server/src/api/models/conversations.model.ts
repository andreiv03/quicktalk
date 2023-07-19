import { model, Schema } from "mongoose";

interface Participant {
	_id: string;
	username: string;
}

export interface Conversation {
	_id: string;
	participants: Participant[];
}

const schema = new Schema<Conversation>(
	{
		participants: {
			required: true,
			type: [
				{
					_id: {
						required: true,
						trim: true,
						type: String
					},
					username: {
						required: true,
						trim: true,
						type: String
					}
				}
			]
		}
	},
	{
		timestamps: true
	}
);

export const ConversationsModel = model<Conversation>("Conversations", schema);
