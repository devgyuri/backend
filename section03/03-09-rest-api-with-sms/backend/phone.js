import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;

export function checkPhone(myPhone) {
  if (myPhone.length < 10 || myPhone.length > 11) {
    console.log("ERROR: please put correct your phone number.");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
}

export async function sendTokenToSMS(myPhone, myToken) {
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;

  const messageService = new mysms(SMS_KEY, SMS_SECRET);
  const result = await messageService.sendOne({
    to: myPhone,
    from: SMS_SENDER,
    text: `[별별] 안녕하세요. 요청하신 인증번호는 [${myToken}]입니다. 새벽에 문자 보내기 테스트`,
  });
  console.log(result);
}
