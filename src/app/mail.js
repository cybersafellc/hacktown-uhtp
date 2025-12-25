import nodemailer from "nodemailer";
const username = process.env.USER_SMTP;
const password = process.env.PASS_SMTP;
const host = process.env.HOST_SMTP;

const transporter = nodemailer.createTransport({
  host: host,
  port: 465,
  secure: true,
  auth: {
    user: username,
    pass: password,
  },
});

export { transporter };
