/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const http = require('http');
var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests
var AssistantV1 = require('watson-developer-cloud/assistant/v1'); // watson sdk
var Twilio = require('twilio');
var acceptedRes=0;
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
const MessagingResponse = Twilio.twiml.MessagingResponse;
const twilioCredentials = require('./twillioCredentials');

var app = express();

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

// Create the service wrapper

var assistant;

if (process.env.ASSISTANT_IAM_APIKEY !== undefined && process.env.ASSISTANT_IAM_APIKEY.length > 0) {
  assistant = new AssistantV1({
    'version': '2018-02-16',
    'url': process.env.ASSISTANT_IAM_URL || '<url>',
    'iam_apikey': process.env.ASSISTANT_IAM_APIKEY || '<iam_apikey>',
    'iam_url': 'https://iam.bluemix.net/identity/token'
  });
} else {
  assistant = new AssistantV1({
    'version': '2018-02-16',
    'username': process.env.ASSISTANT_USERNAME || '<username>',
    'password': process.env.ASSISTANT_PASSWORD || '<password>'
  });
}

// Endpoint to be call from the client side
app.post('/api/message', function (req, res) {
  var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
  if (!workspace || workspace === '<workspace-id>') {
    return res.json({
      'output': {
        'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/assistant-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/assistant-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
      }
    });
  }
  var payload = {
    workspace_id: workspace,
    context: req.body.context || {},
    input: req.body.input || {}
  };

  // Send the input to the assistant service
  assistant.message(payload, function (err, data) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }
    return res.json(updateMessage(payload, data));
  });
});

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Assistant service
 * @param  {Object} response The response from the Assistant service
 * @return {Object}          The response with the updated message
 */
function updateMessage(input, response) {
  var responseText = null;
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
  if (response.intents && response.intents[0]) {
    var intent = response.intents[0];
    // Depending on the confidence of the response the app can return different messages.
    // The confidence will vary depending on how well the system is trained. The service will always try to assign
    // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
    // user's intent . In these cases it is usually best to return a disambiguation message
    // ('I did not understand your intent, please rephrase your question', etc..)
    if (intent.confidence >= 0.75) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if (intent.confidence >= 0.5) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }
  response.output.text = responseText;
  return response;
}

// const { credentials } = twilioCredentials["user-provided"][0];
// console.log(credentials);

// // if (process.env.VCAP_SERVICES) {
// //   var env = JSON.parse(process.env.VCAP_SERVICES);
// //   var local_creds = env['user-provided'][0].credentials;
// //   var accountSid = local_creds.twilio_account_sid;
// //   var authToken = local_creds.twilio_auth_token;
// //   var outNumber = local_creds.twilio_phone_number;
// // } else {
// //   var outNumber = process.env.TWILIO_PHONE_NUMBER;
// //   var accountSid = process.env.TWILIO_ACCOUNT_SID;
// //   var authToken = process.env.TWILIO_AUTH_TOKEN;
// // }

// var accountSid = credentials.twilio_account_sid;
// var authToken = credentials.twilio_auth_token;
// var outNumber = credentials.twilio_phone_number;


// // // Create a new Twilio REST client
// const client = new Twilio(accountSid, authToken);

// // for(var i = 0; i < params.length;i++){
//   var toNumber = JSON.parse(params[i].phone_number);
//   //string donorName = composeMessage(params[i].name);
//   app.get("/send-sms", function (request, response) {
//     client.messages
//     .create({
//         ToZip: toNumber,
//         FromZip: outNumber,
//         body: 'Sent from Don8r - Emergency: Hospital (name) at address (address) is in short of blood with type (blood type) Please response if you can come to help us! We have patients that are in critical condition that needed this blood. Contact (phone number) for details and informations. Enter STOP to opt-out or UNSTOP to opt-in', //Twilio support for opt-out keywords by default
//     })
//     .then((message) => {
//         console.log(message.sid)
//         response.end("Outgoing SMS!");
//     })
//     .catch((err) => {
//         console.log(err);
//         response.end("An error occurred!");
//     });
//   });
// // }

// //May not needed
// function composeMessage(message){
//   console.log("Loading message %d", message);
//   return message;
// }

// app.get("/", function (request, response) {
//   response.end("You don't need to see my identification.");
// });



// app.post("/receive-sms", function (request, response) {
// const twiml = new MessagingResponse();
// twiml.message('Donor(s) responsed:');
// response.writeHead(200, {'Content-Type': 'text/xml'});
// var userRes = twiml.toString();
// console.log(userRes);
// if(userRes.toLowerCase().indexOf("yes")>-1){acceptedRes++;}
// response.log("Number of accepted response(s): %d", userRes);
// response.end(userRes);
// });


// //app.listen(1337, () => {
// http.createServer(app).listen(1337, () => {
//   console.log('Express server listening on port 1337');
// });

module.exports = app;