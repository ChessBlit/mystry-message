import {
	Html,
	Head,
	Preview,
	Container,
	Section,
	Heading,
	Text,
} from "@react-email/components";

interface VerificationCodeEmailProps {
	username: string;
	verifyCode: string;
}

export const VerificationCodeEmail = ({
	username,
	verifyCode,
}: VerificationCodeEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>Your verification code is {verifyCode}</Preview>

			<Section style={{ backgroundColor: "#f9f9f9", padding: "40px 0" }}>
				<Container
					style={{
						backgroundColor: "#ffffff",
						padding: "30px",
						borderRadius: "8px",
						fontFamily: "Arial, sans-serif",
						textAlign: "center",
						maxWidth: "480px",
						margin: "0 auto",
					}}
				>
					<Heading
						as="h2"
						style={{ color: "#222", marginBottom: "20px" }}
					>
						Hi {username}, here&apos;s your verification code
					</Heading>

					<Text
						style={{
							fontSize: "18px",
							color: "#333",
							margin: "0 0 20px",
						}}
					>
						Use the code below to verify your email address.
					</Text>

					<Text
						style={{
							fontSize: "32px",
							fontWeight: "bold",
							backgroundColor: "#f0f0f0",
							padding: "16px 24px",
							borderRadius: "6px",
							display: "inline-block",
							letterSpacing: "4px",
							color: "#000",
							marginBottom: "30px",
						}}
					>
						{verifyCode}
					</Text>

					<Text style={{ fontSize: "14px", color: "#888" }}>
						If you didn&apos;t
						request it, you can safely ignore this email.
					</Text>
				</Container>
			</Section>
		</Html>
	);
};

export default VerificationCodeEmail;
