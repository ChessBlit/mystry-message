import { resend } from "@/lib/resend";
import VerificationCodeEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
	email: string,
	username: string,
	verifyCode: string
): Promise<ApiResponse> {
	try {
		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: email,
			subject: "Mystry message | Verify your account",
			react: VerificationCodeEmail({ username, verifyCode }),
		});

		return { success: true, message: "Sent verification email successfully" };
	} catch (error) {
		console.error("Error sending verification email", error);
		return { success: false, message: "Failed to send verification email" };
	}
}
