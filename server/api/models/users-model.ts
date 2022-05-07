import mongoose, { Schema, SchemaOptions } from "mongoose";

interface UserInterface {
  _id: string;
  email: string;
  password: string;
  username: string;
};

const schemaOptions: SchemaOptions = {
  timestamps: true
};

const usersSchema = new Schema<UserInterface>({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, schemaOptions);

const UsersModel = mongoose.model<UserInterface>("Users", usersSchema);
export default UsersModel;