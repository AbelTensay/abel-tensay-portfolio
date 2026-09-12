import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface NotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function NotificationEmail({
  name,
  email,
  subject,
  message,
}: NotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Inquiry from {name}: {subject}</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>New Portfolio Inquiry</Heading>
          <Text style={textStyle}>
            You received a new contact message from <strong>{name}</strong> (
            <a href={`mailto:${email}`} style={linkStyle}>
              {email}
            </a>
            ).
          </Text>
          <Hr style={hrStyle} />
          <Section style={boxStyle}>
            <Text style={subjectLabelStyle}>Subject:</Text>
            <Text style={subjectTextStyle}>{subject}</Text>
            <Text style={subjectLabelStyle}>Message Body:</Text>
            <Text style={messageTextStyle}>{message}</Text>
          </Section>
          <Text style={footerStyle}>
            Abel Tensay Portfolio Notification System
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const mainStyle = {
  backgroundColor: "#070709",
  fontFamily: "sans-serif",
  padding: "20px 0",
};

const containerStyle = {
  backgroundColor: "#0e0e12",
  border: "1px solid #1a1a24",
  borderRadius: "12px",
  padding: "32px",
  margin: "0 auto",
  maxWidth: "580px",
};

const headingStyle = {
  color: "#f4f4f5",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 16px",
};

const textStyle = {
  color: "#94a3b8",
  fontSize: "14px",
  lineHeight: "22px",
};

const linkStyle = {
  color: "#3b82f6",
  textDecoration: "none",
};

const hrStyle = {
  borderColor: "#1a1a24",
  margin: "20px 0",
};

const boxStyle = {
  backgroundColor: "#050507",
  borderRadius: "8px",
  padding: "16px",
  border: "1px solid #1f1f2e",
};

const subjectLabelStyle = {
  color: "#64748b",
  fontSize: "11px",
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
};

const subjectTextStyle = {
  color: "#f4f4f5",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0 0 12px",
};

const messageTextStyle = {
  color: "#e2e8f0",
  fontSize: "13px",
  lineHeight: "20px",
  whiteSpace: "pre-wrap" as const,
  margin: "0",
};

const footerStyle = {
  color: "#64748b",
  fontSize: "11px",
  textAlign: "center" as const,
  marginTop: "24px",
};
