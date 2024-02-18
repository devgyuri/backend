function createTokenOfPhoneBadCase(phone) {
  if (phone.length >= 10) {
    if (phone.length <= 11) {
      const result = String(Math.floor(Math.random() * 1000000)).padStart(
        6,
        "0",
      );
      console.log(result);

      console.log(phone + ": send to number '" + result + "'");
    } else {
      console.log("ERROR: please put correct your phone number.");
    }
  } else {
    console.log("ERROR: please put correct your phone number.");
  }
}

function createTokenOfPhoneGoodCase(phone) {
  if (phone.length < 10 || phone.length > 11) {
    console.log("ERROR: please put correct your phone number.");
    return;
  }

  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  console.log(phone + ": send to number '" + result + "'");
}

createTokenOfPhoneGoodCase("01012345678");
