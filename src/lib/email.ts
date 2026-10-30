import nodemailer from "nodemailer";

/**
 * Deliver new enquiries by email. Submissions are accepted only after SMTP
 * delivery succeeds; no enquiry data is stored by the website.
 *
 * Required environment variables:
 *   CONTACT_EMAIL   — recipient address for notifications
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD
 */

function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.CONTACT_EMAIL,
  );
}

export async function sendEnquiryNotification(input: {
  subject: string;
  text: string;
}): Promise<{ sent: boolean }> {
  if (!smtpConfigured()) {
    console.info("[email] SMTP not configured — enquiry was not accepted.");
    return { sent: false };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Website Enquiries" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: input.subject,
      text: input.text,
    });
    return { sent: true };
  } catch (error) {
    console.error("[email] Failed to send enquiry notification:", error);
    return { sent: false };
  }
}
