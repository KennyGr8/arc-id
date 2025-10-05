import { Button as EmailButton } from "@react-email/components";

export function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <EmailButton
      href={href}
      style={{
        background: "#2563eb",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "6px",
        textDecoration: "none",
        fontSize: "16px",
      }}
    >
      {children}
    </EmailButton>
  );
}
