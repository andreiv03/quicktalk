import { model, Document, Schema } from "mongoose";

export interface IUser extends Document {
	email: string;
	password: string;
	username: string;
}

const UserSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

export const User = model<IUser>("User", UserSchema);
