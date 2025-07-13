import z from "zod";

export const signInSchema = z.object({
    indetifier: z.string().length(6, "verification code must be 6 digits"),
    password: z.string()
})