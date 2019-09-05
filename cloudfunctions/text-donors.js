/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
  
//var Twilio = require('twilio');
// var acceptedRes=0;
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
//const MessagingResponse = Twilio.twiml.MessagingResponse;


// const { credentials } = twilioCredentials["user-provided"][0];
// console.log(credentials);

// if (process.env.VCAP_SERVICES) {
//   var env = JSON.parse(process.env.VCAP_SERVICES);
//   var local_creds = env['user-provided'][0].credentials;
//   var accountSid = local_creds.twilio_account_sid;
//   var authToken = local_creds.twilio_auth_token;
//   var outNumber = local_creds.twilio_phone_number;
// } else {
//   var outNumber = process.env.TWILIO_PHONE_NUMBER;
//   var accountSid = process.env.TWILIO_ACCOUNT_SID;
//   var authToken = process.env.TWILIO_AUTH_TOKEN;
// }
//var express = require('express'); // app server
//var app = express();

var accountSid = "ACd44595c0e4ad737dcf4400c73ca2229c";
var authToken = "6a61629685b4c299a8517615adf756cd";
var outNumber = "+14343255099";
const client = require('twilio')(accountSid, authToken);


// // Create a new Twilio REST client
//const client = new Twilio(accountSid, authToken);


//May not needed
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


//app.listen(1337, () => {
// http.createServer(app).listen(1337, () => {
//   console.log('Express server listening on port 1337');
// });

function main(params) {
    //var numList = params.NumberList
    //var toNumber = "+1"+numList[0]
    var toNumber = "+18329923153"
	client.messages
        .create({
            to: toNumber,
            from: outNumber,
            body: 'Sent from Don8r - Emergency: Hospital (name) at address (address) is in short of blood with type (blood type) Please response if you can come to help us! We have patients that are in critical condition that needed this blood. Contact (phone number) for details and informations. Enter STOP to opt-out or UNSTOP to opt-in', //Twilio support for opt-out keywords by default
        })
        .then(message => console.log(message.sid))
        .done();
        
        // .then((message) => {
        //     console.log(message.sid)
        //     return { "message": "Outgoing SMS!" };
        // })
        // .catch((err) => {
        //     console.log(err);
        //     return { "message": "An error occurred!" };
        // });
}

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+15017122661',
//      to: '+15558675310'
//   })
//   .then(message => console.log(message.sid))
//   .done();
