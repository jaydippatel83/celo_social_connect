const E164_REGEX = /^\+[1-9][0-9]{1,14}$/;

function validatePhoneNumber(phoneNumber) {
  if (E164_REGEX.test(phoneNumber)) {
    return true;
  }
  return false;
}

async function sendSmsVerificationToken(phoneNumber) {
  try {
    if (!validatePhoneNumber(phoneNumber)) {
      // eslint-disable-next-line no-throw-literal
      throw   "Attempting to hash a non-e164 number: " + phoneNumber;
    }

    const data = JSON.stringify({
      to: phoneNumber,
      channel: "sms",
    });

    const response = await fetch(
      `${process.env.REACT_APP_TWILIO_URL}/start-verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );
    console.log("Verification request response:", response);
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    throw `Failed SMS verification: ${error}`;
  }
}

async function verifyToken(phoneNumber, receivedCode) {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      code: receivedCode,
    });
    const response = await fetch(
      `${process.env.REACT_APP_TWILIO_URL}/check-verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );

    const json = await response.json();
    console.log("verification response", json.success);
    return json.success;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  E164_REGEX,
  validatePhoneNumber,
  sendSmsVerificationToken,
  verifyToken,
};
