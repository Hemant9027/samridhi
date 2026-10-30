import nodemailer from "nodemailer";

/**
 * Optional e-mail notification for new enquiries.
 *
 * Delivery activates only when SMTP configuration is present. Until real
 * credentials are supplied, submissions are still persisted to the database
 * and this function no-ops with a log line — the site never claims that
 * e-mail delivery works before it has been tested with valid configuration.
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
    console.info(
      "[email] SMTP not configured — enquiry stored in database only. Set CONTACT_EMAIL and SMTP_* to enable notifications.",
    );
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
    // Never fail the submission because a notification could not be sent —
    // the enquiry is already persisted. Operators should watch the logs.
    console.error("[email] Failed to send enquiry notification:", error);
    return { sent: false };
  }
}
