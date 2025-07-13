import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
	content: string;
	createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now(),
	},
});

export interface User extends Document {
	username: string;
	email: string;
	password: string;
	verifyCode: string;
	verifyCodeExpiry: Date;
	isAcceptingMessage: boolean;
	isVerified: boolean;
	messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
		trim: true,
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		trim: true,
		unique: true,
		match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		match: [
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
			"Password is too weak",
		],
	},
	verifyCode: {
		type: String,
		required: [true, "Verify Code is required"],
	},
	verifyCodeExpiry: {
		type: Date,
		required: [true, "Verify Code Expiry is required"],
	},
	isAcceptingMessage: {
		type: Boolean,
		default: false,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	messages: {
		type: [messageSchema],
		required: true,
	},
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))
export default UserModel
