import nodemailer from "nodemailer";
require("dotenv").config();

const email_host = process.env.EMAIL_HOST ? process.env.EMAIL_HOST : "";
const email_port: any = process.env.EMAIL_PORT;
const email_user = process.env.EMAIL_USER;
const email_password = process.env.EMAIL_PASSWORD;

console.log(email_host);

export default nodemailer.createTransport({
  host: email_host,
  port: email_port,
  auth: {
    user: email_user,
    pass: email_password,
  },
});
