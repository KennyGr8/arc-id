import { Text } from "@react-email/components";
import { Layout, Button } from '../components'

export default function WelcomeEmail({ userName, dashboardLink }: { userName: string; dashboardLink: string }) {
  return (
    <Layout>
      <Text style={{ fontSize: "24px", fontWeight: "bold", color: "#111" }}>Welcome to ArcID 🚀</Text>
      <Text style={{ fontSize: "16px", color: "#444" }}>
        Hi <strong>{userName}</strong>,<br /><br />
        Your account has been created successfully. You’re now part of a secure ecosystem where authentication &
        identification are seamless.
      </Text>
      <Button href={dashboardLink}>Go to Dashboard</Button>
    </Layout>
  );
}
