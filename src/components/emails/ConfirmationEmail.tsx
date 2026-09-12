import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Text,
} from "@react-email/components";

interface ConfirmationEmailProps {
  name: string;
  subject: string;
}

export function ConfirmationEmail({ name, subject }: ConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for reaching out to Abel Tensay</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Thank You for Reaching Out</Heading>
          <Text style={textStyle}>Hi {name},</Text>
          <Text style={textStyle}>
            Thank you for contacting me regarding <strong>&quot;{subject}&quot;</strong>.
            I have received your message and will review your inquiry as soon as possible.
          </Text>
          <Text style={textStyle}>
            You can expect a direct response within 24 hours.
          </Text>
          <Hr style={hrStyle} />
          <Text style={signatureStyle}>
            Best regards,<br />
            <strong>Abel Tensay</strong><br />
            <span style={{ color: "#3b82f6" }}>
              Software Engineer · Full-Stack Developer · UI/UX Designer
            </span>
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
  marginBottom: "12px",
};

const hrStyle = {
  borderColor: "#1a1a24",
  margin: "20px 0",
};

const signatureStyle = {
  color: "#f4f4f5",
  fontSize: "13px",
  lineHeight: "20px",
};
