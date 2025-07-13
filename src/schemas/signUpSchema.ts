import z, { email } from "zod";

export const usernameValidation = z
	.string()
	.min(2, "Username must be atleast 2 characters")
	.max(20, "Username must be no more than 20 characters")
	.regex(/[^a-zA-Z0-9_]+$/, "Username must contain special characters");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "password must be more than 6 characters"})
})