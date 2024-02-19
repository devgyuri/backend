import { checkEmail, getWelcomeTemplate, setTemplateToEmail } from "./email.js";

function createUser({ name, age, school, email }) {
  const isValid = checkEmail(email);
  if (!isValid) {
    return;
  }

  const myTemplate = getWelcomeTemplate({ name, age, school });
  setTemplateToEmail(email, myTemplate);
}

const name = "맹구";
const age = 12;
const school = "다람쥐 초등학교";
const email = "abc@h.com";
createUser({ name, age, school, email });
