import nodemailer from "nodemailer";

// SEND EMAIL USING SMTP AND NODEMAILER

const sendEmail = async (option) => {
  console.log("SENDING EMAIL" + option);

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: option.to,
    subject: option.subject,
    html: option.html,
  };

  await transport.sendMail(message);
};

export default sendEmail;
