const nodemailer = require("nodemailer");

// Configure your SMTP transport (replace with your real credentials)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "your@email.com",
    pass: process.env.SMTP_PASS || "yourpassword",
  },
});

async function sendMail({ to, subject, text, html }) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER || "your@email.com",
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendMail };
