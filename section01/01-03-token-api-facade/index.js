function checkPhone(myPhone) {
  if (myPhone.length < 10 || myPhone.length > 11) {
    console.log("ERROR: please put correct your phone number.");
    return false;
  } else {
    return true;
  }
}

function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
}

function sendTokenToSMS(myPhone, myToken) {
  console.log(myPhone + ": send to number '" + myToken + "'");
}

function createTokenOfPhone(myPhone) {
  const isValid = checkPhone(myPhone);
  if (isValid == false) {
    return;
  }

  const myToken = getToken();
  sendTokenToSMS(myPhone, myToken);
}

createTokenOfPhone("01012345678");
