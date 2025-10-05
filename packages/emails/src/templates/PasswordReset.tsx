import { Text } from "@react-email/components";
import { Layout, Button } from '../components'

export default function PasswordReset({ userName, resetLink }: { userName: string; resetLink: string }) {
  return (
    <Layout>
      <Text style={{ fontSize: "22px", fontWeight: "bold", color: "#111" }}>Reset Your Password</Text>
      <Text style={{ fontSize: "16px", color: "#444" }}>
        Hi <strong>{userName}</strong>,<br /><br />
        We received a request to reset your ArcID password. If this was you, click below:
      </Text>
      <Button href={resetLink}>Reset Password</Button>
      <Text style={{ fontSize: "13px", color: "#777", marginTop: "20px" }}>
        If you didn’t request this, you can safely ignore this email.
      </Text>
    </Layout>
  );
}
