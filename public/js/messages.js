

$("#btnSend" ).click(function() {
  	//alert( "Handler for .click() called." );
  	//var twilio = require('../lib');

  	var accountSid = '{{ AC4a0cac0c2009c0b003ab29f17bcc91d8 }}'; // Your Account SID from www.twilio.com/console
	var authToken = '{{ cc40b4ebca0d931a145f79c189e08a63 }}';   // Your Auth Token from www.twilio.com/console
	var twilio = require('twilio');
	var client = new twilio.RestClient(accountSid, authToken);

	client.messages.create({
	    body: 'Hello from Node',
	    to: '+918557988984',  // Text this number
	    from: '+918872728410' // From a valid Twilio number
	}, function(err, message) {
	    console.log(message.sid);
	});
});