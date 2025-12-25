import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: `smtpdm-ap-southeast-1.aliyun.com`,
  port: 465,
  secure: true,
  auth: {
    user: `sekolah-aman@belibelionli.com`,
    pass: `ANjiang123`,
  },
});

export { transporter };
