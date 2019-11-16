function sendMessage(phone, message) {
    const accountSid = "AC672997e46b66c2d8ba32e8974f7be197";
    const authToken = "c47e88dc694db62ef1843cccabd1709f";
    const client = require("twilio")(accountSid, authToken);
  
    client.messages
      .create({
        body: message,
        from: "+12055513782",
        to: phone
      })
      .then(message => console.log(message.sid));
      console.log("send");
  }

  module.exports = sendMessage;