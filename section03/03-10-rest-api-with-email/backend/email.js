import { getToday } from "./utils.js";
import nodemailer from "nodemailer";

export function checkEmail(email) {
  if (email === undefined || email.includes("@") === false) {
    console.log("ERROR: invalid email address");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, age, school }) {
  const dateString = getToday();

  const myTemplate = `
    <html>
      <body>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width: 500px;">
            <h1>${name}님, 가입을 환영합니다.</h1>
            <hr />
            <div>이름: ${name}</div>
            <div style="color: pink;">나이: ${age}세</div>
            <div>학교: ${school}</div>
            <div>가입일: ${dateString}</div>
          </div>
        </div>
      </body>
    </html>
  `;

  return myTemplate;
}

export async function setTemplateToEmail(myEmail, result) {
  const MAIL_ADDRESS = process.env.MAIL_ADDRESS;
  const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_ADDRESS,
      pass: MAIL_PASSWORD,
    },
  });

  const res = await transporter.sendMail({
    from: MAIL_ADDRESS,
    to: myEmail,
    subject: "[별별] 가입을 축하합니다!",
    html: result,
  });
}
