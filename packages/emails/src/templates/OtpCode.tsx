import { Text } from "@react-email/components";
import { Layout } from '../components'

export default function OtpCode({ userName, otpCode }: { userName: string; otpCode: string }) {
  return (
    <Layout>
      <Text style={{ fontSize: "22px", fontWeight: "bold", color: "#111" }}>Your Security Code</Text>
      <Text style={{ fontSize: "16px", color: "#444", textAlign: "center" }}>
        Hi <strong>{userName}</strong>,<br /><br />
        Use the code below to complete your login:
      </Text>
      <div style={{ fontSize: "28px", fontWeight: "bold", color: "#2563eb", margin: "20px 0", textAlign: "center" }}>
        {otpCode}
      </div>
      <Text style={{ fontSize: "13px", color: "#777", textAlign: "center" }}>
        This code will expire in 10 minutes.
      </Text>
    </Layout>
  );
}
