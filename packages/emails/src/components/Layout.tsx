import { Html, Head, Body, Container, Text } from "@react-email/components";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "Arial, sans-serif" }}>
        <Container
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "600px",
          }}
        >
          {children}
          <Text style={{ fontSize: "12px", color: "#999", marginTop: "30px", textAlign: "center" }}>
            © {new Date().getFullYear()} ArcID. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
