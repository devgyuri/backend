function checkEmail(email) {
  if (email === undefined || email.includes("@") === false) {
    console.log("ERROR: invalid email address");
    return false;
  } else {
    return true;
  }
}

function getToday(createdAt) {
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth();
  const day = createdAt.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

function getWelcomeTemplate({ name, age, school, createdAt }) {
  const dateString = getToday(createdAt);

  const myTemplate = `
    <html>
      <body>
        <h1>${name}님, 가입을 환영합니다.</h1>
        <hr />
        <div>이름: ${name}</div>
        <div>나이: ${age}세</div>
        <div>학교: ${school}</div>
        <div>가입일: ${dateString}</div>
      </body>
    </html>
  `;

  return myTemplate;
}

function setTemplateToEmail(myEmail, result) {
  console.log(
    myEmail + " 이메일로 가입환영 템플릿 " + result + "를 전송합니다.",
  );
}

function createUser({ name, age, school, email, createdAt }) {
  const isValid = checkEmail(email);
  if (!isValid) {
    return;
  }

  const myTemplate = getWelcomeTemplate({ name, age, school, createdAt });
  setTemplateToEmail(email, myTemplate);
}

const name = "맹구";
const age = 12;
const school = "다람쥐 초등학교";
const email = "abc@h.com";
const createdAt = new Date();
createUser({ name, age, school, email, createdAt });
