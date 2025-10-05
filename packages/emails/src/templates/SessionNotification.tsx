import { Text } from "@react-email/components";
import { Layout } from '../components'

export default function SessionNotification({
  userName,
  location,
  device,
  time,
  resetLink,
}: {
  userName: string;
  location: string;
  device: string;
  time: string;
  resetLink: string;
}) {
  return (
    <Layout>
      <Text style={{ fontSize: "22px", fontWeight: "bold", color: "#111" }}>New Login Detected</Text>
      <Text style={{ fontSize: "16px", color: "#444" }}>
        Hi <strong>{userName}</strong>,<br /><br />
        We noticed a login to your ArcID account:
      </Text>
      <ul style={{ color: "#333", fontSize: "15px", lineHeight: "1.6" }}>
        <li>📍 Location: {location}</li>
        <li>💻 Device: {device}</li>
        <li>⏰ Time: {time}</li>
      </ul>
      <Text style={{ fontSize: "14px", color: "#444" }}>
        If this wasn’t you, <a href={resetLink} style={{ color: "#dc2626", textDecoration: "none" }}>reset your password</a> immediately.
      </Text>
    </Layout>
  );
}
