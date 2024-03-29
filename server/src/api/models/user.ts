import { model, Schema } from "mongoose";

export interface User {
	_id: string;
	email: string;
	password: string;
	username: string;
}

const schema = new Schema(
	{
		email: {
			required: true,
			trim: true,
			type: String,
			unique: true
		},
		password: {
			required: true,
			trim: true,
			type: String
		},
		username: {
			required: true,
			trim: true,
			type: String,
			unique: true
		}
	},
	{
		timestamps: true
	}
);

export const User = model<User>("Users", schema);
