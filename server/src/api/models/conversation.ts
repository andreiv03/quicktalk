import { model, Schema } from "mongoose";

export interface Conversation {
	_id: string;
	participants: {
		_id: string;
		username: string;
	}[];
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

export const Conversation = model<Conversation>("Conversations", schema);
