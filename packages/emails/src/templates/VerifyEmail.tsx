import { Text } from '@react-email/components'
import { Layout, Button } from '../components'

export default function VerifyEmail({ userName, verificationLink }: { userName: string; verificationLink: string }) {
  return (
    <Layout>
      <Text style={{ fontSize: "22px", fontWeight: "bold", color: "#111" }}>Verify Your Email</Text>
      <Text style={{ fontSize: "16px", color: "#444" }}>
        Hi <strong>{userName}</strong>,<br /><br />
        Please verify your email to activate your ArcID account.
      </Text>
      <Button href={verificationLink}>Verify Email</Button>
      <Text style={{ fontSize: "13px", color: "#777", marginTop: "20px" }}>
        This link will expire in 24 hours.
      </Text>
    </Layout>
  );
}
