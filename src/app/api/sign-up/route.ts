import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(req: Request) {
	await dbConnect();
	try {
		const { username, email, password } = await req.json();

		const exisingUserVerifiedByUsername = await UserModel.findOne({
			username,
			isVerified: true,
		});

		if (exisingUserVerifiedByUsername)
			return Response.json(
				{ success: false, message: "Username is already taken" },
				{ status: 400 }
			);

		const existingUserByEmail = await UserModel.findOne({ email });
		const verifyCode = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		if (existingUserByEmail) {
			if (existingUserByEmail.isVerified) {
				return Response.json(
					{
						success: false,
						message: "User already exists by this email",
					},
					{ status: 500 }
				);
			} else {
				const hashedPassword = await bcrypt.hash(password, 10);
				existingUserByEmail.password = hashedPassword;
				existingUserByEmail.verifyCode = verifyCode;
				existingUserByEmail.verifyCodeExpiry = new Date(
					Date.now() + 3600000
				);

				await existingUserByEmail.save();
			}
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			const expiryDate = new Date();
			expiryDate.setHours(expiryDate.getHours() + 1);

			const newUser = new UserModel({
				username,
				email,
				password: hashedPassword,
				verifyCode,
				verifyCodeExpiry: expiryDate,
				isAcceptingMessage: true,
				isVerified: false,
				messages: [],
			});
			await newUser.save();
		}

		const emailResponse = await sendVerificationEmail(
			email,
			username,
			verifyCode
		);
		if (!emailResponse.success) {
            console.log(emailResponse.message);
			return Response.json(
				{
					success: false,
					message: emailResponse.message,
				},
				{ status: 500 }
			);
		}
		return Response.json(
			{
				message:
					"User registered successfully please verify your email",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error registering user", error);
		return Response.json(
			{
				success: false,
				message: "Error registering user",
			},
			{
				status: 500,
			}
		);
	}
}
