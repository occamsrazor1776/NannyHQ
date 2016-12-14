var request = require('request-json');
var twilio = require('twilio');
var mysql = require('mysql');
var Config = require('../classes/config');
var config = Config();
var connection;

function handleDisconnect() {
	connection = mysql.createConnection(config.mysql); // Recreate the connection, since
	// the old one cannot be reused.

	connection.connect(function(err) {              // The server is either down
		if(err) {                                     // or restarting (takes a while sometimes).
			setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
		}                                     // to avoid a hot loop, and to allow our node script to
	});                                     // process asynchronous requests in the meantime.
	// If you're also serving http, display a 503 error.
	connection.on('error', function(err) {
		//console.log('db error', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
			handleDisconnect();                         // lost due to either server restart, or a
		} else {                                      // connnection idle timeout (the wait_timeout
			throw err;                                  // server variable configures this)
		}
	});
}

handleDisconnect();
var client = require('twilio')(config.twilio.sid, config.twilio.token);

exports.getvalue = function(req,res){	
	client.sms.messages.list(function(err, data) {
	    data.smsMessages.forEach(function(sms) {
	        console.log(sms.to);
	    });
	});
};

exports.loginUser = function(req,res){	
	var user={ username: 'admin', password: 'test1234'}
	req.session.user = user;
	res.redirect('/');
};

exports.getSMSList = function(req, res) {
	client.sms.messages.list(function(err, data) {
	    data.smsMessages.forEach(function(sms) {
	        console.log(sms.to);
	    });
	});
};

exports.sendMultipleSMS = function(req, res) {
 		var twilio = require('twilio');
		var nums = ['+918126763474', '+918557988984', '+918909373895','+919888698578'];
		
		var client = new twilio.RestClient(config.twilio.sid, config.twilio.token);
		nums.forEach(function(elementOfArray) {
				//Send an SMS text message				
				client.messages.create({
						to: elementOfArray,
						from: '+' + config.twilio.from,
						body:  "Test Message SMS to Multiusers"

					}, function(err, responseData) { //this function is executed when a response is received from Twilio
							

						if (!err) { // "err" is an error received during the request, if any
						
							console.log(responseData.from); // outputs "+14506667788"
							console.log(responseData.body); // outputs "word to your mother."
							app.use(function(req,res,next){
								    var _send = res.send;
								    var sent = false;
								    res.send = function(data){
								        if(sent) return;
								        _send.bind(res)(data);
								        sent = true;
								    };
								    next();
								});
	
							

						} else {
							console.log(err);
							result: "Message Sending failed."
						}
				});
		})
};

exports.SendSMSSingle = function(req, res) {
  var twilio = require('twilio');	

	//var obj = JSON.parse(req.body);
	//var mobile = obj[0];
	//var smsmsg = obj[1];
	//var lblSuccess = req.body.lblSucess;
	var client = new twilio.RestClient(config.twilio.sid, config.twilio.token);
	console.log(req.body.Mobile);
	//Send an SMS text message
	client.messages.create({

		to: req.body.Mobile,
		from: '+' + config.twilio.from,
		body:  req.body.Message

	}, function(err, responseData) { //this function is executed when a response is received from Twilio
			
		if (!err) { // "err" is an error received during the request, if any
		
			console.log(responseData.from); // outputs "+14506667788"
			console.log(responseData.body); // outputs "word to your mother."

			res.send({
				success: true,
				result: "Message Sent successfully."
			});

		} else {
			result: "Message Sendingfailed failed."
		}
	});
};

exports.getContacts = function(req, res) {
 	var sqlQuery ="Select * from tb_contacts order by FirstName asc";
	connection.query(sqlQuery, function(err, result)
	{		 
		if(err){
			console.log(err);
		  	res.send({
				success: false, 
				status: err
			});
		}
		else{
			res.send({
				success: true, 
				status: "",
				data:result
			});
		}
	});
};

exports.getSingleContact = function(req, res) {
  console.log(req.query.Id);
	var sqlQuery ="Select * from tb_contacts where Id=" + req.query.Id;
	connection.query(sqlQuery, function(err, result)
	{		 
		if(err){
			console.log(err);
		  	res.send({
				success: false, 
				status: err
			});
		}
		else{
			
			res.send(result);
		}
	});
};

exports.newContact = function(req, res) {
  var sqlQuery ="INSERT INTO tb_contacts (FirstName,MiddleName,LastName,Email,Mobile,jobTitle,Location,Notes,createdDate) VALUES ('" + req.body.F_name + "',' "+ req.body.M_name + "','" + req.body.L_name + "','" + req.body.Emailadd +"','" + req.body.Mobile + "','" + req.body.J_title +"','" + req.body.Location + "','"+ req.body.Notes +"',NOW())";
	
	connection.query(sqlQuery,function(err, result) 
	{                                                      
	 if (err) {
	  	console.log(err);
	  	res.send({
			success: false, 
			status: "Contact Insertion Failed " + err
		});
	  }
	  else
	  {
	  	res.send({
			success: true, 
			status: "Contact Inserted!!"
		});
	  }	  
	});	
};

exports.updateContact = function(req, res) {
  var querySql = "Update tb_contacts set FirstName = '"+req.body.F_name+"', MiddleName = '"+req.body.M_name+"', LastName='"+req.body.L_name+"', Email='"+req.body.Emailadd+"', Mobile='"+req.body.Mobile+"', jobTitle='"+req.body.J_title+"', Location='"+req.body.Location+"', Notes='"+req.body.Notes+"', modifiedDate=NOW() Where Id ="+req.body.Id;
	connection.query(querySql,function(err, result) 
	{                                                      
	 if (err) {
	  	console.log(err);
	  	res.send({
			success: false, 
			status: "Contact Insertion Failed!!"
		});
	  }
	  else
	  {
	  	console.log('Changed ' + result.changedRows + ' rows');	
	  	res.send({
			success: true, 
			status: "Contact Updated!!"
		});
	  }
	 });	 
};

exports.importContact = function (req, res){
	var sampleFile; 
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
 
    sampleFile = req.files.sampleFile;
    sampleFile.mv('files/' + sampleFile.name, function(err, result) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            console.log(sampleFile.name);  
           
            res.send({
				success: true,
				result: " Contacts Uploaded successfully."
			});

			
        }

    });
};