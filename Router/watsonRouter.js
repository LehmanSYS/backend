const express = require("express");
const router = express.Router();
const axios = require('axios');
const AssistantV2 = require('ibm-watson/assistant/v2'); // watson sdk
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
    version: '2019-11-16',
    authenticator: new IamAuthenticator({
      apikey: 'G07iNGsMvrLBL2pnM-6b3PtQ4JQ0eINsOh5fdOGjHgxU',
    }),
    url: 'https://gateway-lon.watsonplatform.net/assistant/api/v1/workspaces/1660a4d5-8e9d-4b5b-986d-a87bf3724bec/message',
  });

// Endpoint to be call from the client side
router.post('/message', function(req, res) {
  let assistantId = "284a10db-7d27-4c04-9c6c-eef101274763";

  var textIn = '';

  if (req.body.input) {
    textIn = req.body.input.text;
  }

  var payload = {
    assistantId: assistantId,
    sessionId: req.body.session_id,
    input: {
      message_type: 'text',
      text: textIn,
    },
  };

  // Send the input to the assistant service
  assistant.message(payload, function(err, data) {
    if (err) {
      const status = err.code !== undefined && err.code > 0 ? err.code : 500;
      return res.status(status).json(err);
    }

    return res.json(data);
  });
});

router.get('/session', function(req, res) {
  assistant.createSession(
    {
      assistantId: "284a10db-7d27-4c04-9c6c-eef101274763",
    },
    function(error, response) {
      if (error) {
        return res.send(error);
      } else {
        return res.send(response);
      }
    }
  );
});

module.exports = router;