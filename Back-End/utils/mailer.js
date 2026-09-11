const nodemailer = require("nodemailer");

function shouldSkipSend() {
  const mode = (process.env.EMAIL_MODE || "").toLowerCase();
  if (mode === "log" || mode === "skip" || mode === "noop") return true;
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return true;
  return false;
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 2525,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendMail({ to, subject, text, html }) {
  if (shouldSkipSend()) {
    console.log("[email:skip]", { to, subject, text });
    return { skipped: true };
  }
  const transporter = createTransport();
  return transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendMail };
