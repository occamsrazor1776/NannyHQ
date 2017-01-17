var request = require('request-json');
var twilio = require('twilio');
var mysql = require('mysql');
var Config = require('../classes/config');
var config = Config();
var moment = require('moment');
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

var client = require('twilio')(config.twilio.sid, config.twilio.token);

exports.getvalue = function(req,res){	
	client.sms.messages.list(function(err, data) {
		data.smsMessages.forEach(function(sms) {
			console.log(sms.to);
		});
	});
};

exports.login = function(req, res){	
	handleDisconnect();
	//var user = { username: 'admin', password: 'test1234'}

	var sqlQuery="select * from tb_users where userName='"+ req.body.uname +"' and userPassword ='" + req.body.upass + "'";
	console.log(sqlQuery);
	
	connection.query(sqlQuery, function(err, user)
	{		 
		if(err){
			console.log(err);
			connection.destroy();
			res.send({
				success: false, 
				status: err
			});
		}
		else{
			if(!user.length){
				//res.redirect('/login');
				res.send({
					success: false,
					result: "Username/Password incorrect."
				});
			}
			else
			{
				req.session.user = user;	
				//console.log(user)		;
				//req.session.user = user;
				connection.destroy();
				res.redirect('/');
			}
		}
	});

	
	//res.redirect('/');
};


exports.getSMSList = function(req, res) {
	client.sms.messages.list(function(err, data) {
		res.send({
					success: true, 
					status: err,
					data:data
				});
		data.smsMessages.forEach(function(sms) {
		//	console.log(sms);
		});
	});

};

exports.getMessaegeDates = function(req, res){
	var userIdTo = req.query.UserIdTo;
	var userIdFrom = req.query.UserIdFrom;
	handleDisconnect();
	var sql ="SELECT distinct(DATE(sendDate)) as sentDate FROM tb_messagedetail where userFromId = " + userIdFrom +"  and userId = " + userIdTo+" order by sendDate";
	connection.query(sql, function(err, result)
	{		 
		if(err){
			console.log(err);
			connection.destroy();
			res.send({
				success: false, 
				status: err
			});
		}
		else{
				connection.destroy();
				res.send({
					success: true, 
					status: err,
					data:result
				});
			//res.redirect('/');
		}
	});
}

exports.getMessagesSent = function(req,res){
	var userIdTo = req.query.UserIdTo;
	var userIdFrom = req.query.UserIdFrom;
	var _dt = req.query.date;
	handleDisconnect();
	var querySql = "select * from tb_messagedetail where userFromId ="+ userIdFrom +" and userId =" + userIdTo +" and DATE(sendDate) = '"+_dt+ "' order by sendDate;"

	console.log(querySql);
	connection.query(querySql, function(err, result)
	{		 
		if(err){
			console.log(err);
			connection.destroy();
			res.send({
				success: false, 
				status: err
			});
		}
		else{			
				connection.destroy();
				res.send({
					success: true, 
					status: err,
					data:result
				});
			//res.redirect('/');
		}
	});
};

exports.searchC = function(req, res){
	handleDisconnect();
	var sqlQuery ="Select * from tb_contacts where  FirstName LIKE '%"+ req.query.SearchCont ;
	sqlQuery +="%' OR  LastName LIKE  '%"+ req.query.SearchCont+"%' or Mobile LIKE '%"+ req.query.SearchCont+"%' or Email LIKE '%"+req.query.SearchCont+"%'" ;
	connection.query(sqlQuery, function(err, result)
	{		 
		if(err){
			console.log(err);
			connection.destroy();
			res.send({
				success: false, 
				status: err
			});
		}
		else{

				connection.destroy();
				res.send({
					success: true, 
					status: err,
					data:result
				});
			//res.redirect('/');
		}
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

exports.sendMail = function(req, res){
	var api_key = config.smtp.apikey;
	var domain = config.smtp.domain;
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
	handleDisconnect();
	var sqlQuery ="select * from tb_users where userEmail = '"+req.body.uName+"'";
	connection.query(sqlQuery, function(err, result)
	{		 
		if(err){
			console.log(err);				
			connection.destroy();
			res.send({
				success: false, 
				status: err
			});
		}
		else
		{
			connection.destroy();
			console.log(result[0].userPassword);
			var data = {
	  		from: 'NannyHQ <me@samples.mailgun.org>',
			to: req.body.uName,
			subject: 'sending Password',
			//text: 'Here is user password for login, <br/> <b> Password : </b>'+ result[0].userPassword
			html : '<b>NannyHQ</b><br/>Here is user password for login, <br/> <b> Password : </b>'+ result[0].userPassword
			};
			console.log( data);
			mailgun.messages().send(data, function (error, body) {
			  console.log(body);
			  if(!error){
		  		res.send({
					success: true, 
					status: ""
				});
				
			  }
			  else{
					res.send({
						success: false, 
						status: error
					});
				}
			});
			//res.send(result);
		}
	});
	
}

exports.SendSMSSingle = function(req, res) {
	var twilio = require('twilio');	
	var mysqlTimestamp = moment(Date.now()).format('LLL');
	console.log(mysqlTimestamp);

	//var obj = JSON.parse(req.body);
	//var mobile = obj[0];
	//var smsmsg = obj[1];
	//var lblSuccess = req.body.lblSucess;
	var client = new twilio.RestClient(config.twilio.sid, config.twilio.token);
	//console.log(req.body.Mobile);
	console.log(req.body);
	//Send an SMS text message
	client.messages.create({

		to: req.body.Mobile,
		from: '+' + config.twilio.from,
		body:  req.body.Message//,
		//mediaUrl: req.body.MMSFILE

	}, function(err, responseData) { //this function is executed when a response is received from Twilio
		
		if (!err) { // "err" is an error received during the request, if any
			
			console.log(responseData.from); // outputs "+14506667788"
			console.log(responseData.body); // outputs "word to your mother."
			handleDisconnect();
			if(req.body.userID === undefined){

			}
			else {
				var sqlQuery ="INSERT INTO tb_messagedetail (messageText,userId,userToPhone,sendDate,userFromPhone,userFromId) values ('"+ req.body.Message +"',"+ req.body.useridTO +",'"+req.body.Mobile+"','"+ mysqlTimestamp +"','"+config.twilio.from+"',"+ req.body.userID +")";
				console.log(sqlQuery);
				connection.query(sqlQuery, function(err, result)
				{		 
					if(err){
						console.log(err);				
						connection.destroy();
						res.send({
							success: false, 
							status: err
						});
					}
					else{
						connection.destroy();
						res.send(result);
					}
				});
			}
			//res.send({
				//success: true,
				//result: "Message Sent successfully."
			//});

		} else {
			result: "Message Sendingfailed failed."
		}

		

	});
};

exports.SendSMSSingleBulk = function(req, res) {
	var twilio = require('twilio');	
	var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
	console.log(mysqlTimestamp);

	//var obj = JSON.parse(req.body);
	//var mobile = obj[0];
	//var smsmsg = obj[1];
	//var lblSuccess = req.body.lblSucess;
	var client = new twilio.RestClient(config.twilio.sid, config.twilio.token);
	//console.log(req.body.Mobile);
	console.log(req.body);
	//Send an SMS text message
	client.messages.create({

		to: req.body.Mobile,
		from: '+' + config.twilio.from,
		body:  req.body.Message//,
		//mediaUrl: req.body.MMSFILE

	}, function(err, responseData) { //this function is executed when a response is received from Twilio
		
		if (!err) { // "err" is an error received during the request, if any
			
			console.log(responseData.from); // outputs "+14506667788"
			console.log(responseData.body); // outputs "word to your mother."
			console.log(responseData);
			
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
	handleDisconnect();
	var sqlQuery ="Select * from tb_contacts order by FirstName asc";
	connection.query(sqlQuery, function(err, result)
	{		 
		if(err){
			connection.destroy();
			res.send({
				success: false, 
				status: err
			});
		}
		else{
			
			connection.destroy();
			res.send({
				success: true, 
				status: "",
				data:result
			});
		}

	});
};


exports.getmessngerProfile = function(req,res){
	if(req.session.user){		
		res.send({
				success: true, 
				status: "",
				data:req.session.user
			});
	}
	else{
		
	}
}

exports.LoginProfile = function(req, res){
	handleDisconnect();
	var userid = req.session.user;
	console.log("session " + userid.userId);
	var sqlQuery ="Select * from tb_users where userId = 2";
	
	connection.query(sqlQuery, function(err,result){
		if(err){
			console.log(err);
			connection.destroy();
			res.send({
				success: false,
				status: err
			})
		}
		else{
			connection.destroy();
			res.send({
				success: true, 
				status: "",
				data:result
			});
		}
	});
};

exports.roles = function(req, res){
	handleDisconnect();
	var sqlQuery="select * from tb_roles where roleId = "+req.body.Id;
	console.log(req.body.Id);
	connection.query(sqlQuery, function(err,result){
		if(err){
			console.log(err);
			connection.destroy();
			res.send({
				success: false,
				status: err
			})
		}
		else{
			connection.destroy();
			res.send({
				success: true, 
				status: "",
				data:result
			});
		}
	});

};

exports.getSingleContact = function(req, res) {
	handleDisconnect();
	var sqlQuery ="Select * from tb_contacts where Id=" + req.query.Id;
	connection.query(sqlQuery, function(err, result)
	{		 
		if(err){
			console.log(err);
			connection.destroy();
			res.send({
				success: false, 
				status: err
			});
		}
		else{
			connection.destroy();
			res.send(result);
		}
	});
};


exports.getUserDetailsPhone = function(req, res){
	handleDisconnect();
	console.log(req.query.phone);
	var sqlquery = "Select * from tb_contacts where Mobile LIKE '%" + req.query.phone+"%'" ;
	connection.query(sqlquery, function(err, result)
	{		 
		if(err){
			console.log(err);
			connection.destroy();
			res.send({
				success: false, 
				status: err
			});
		}
		else{
			connection.destroy(); 
			res.send({
				success: true,
				status :"",
				data: result
			});
		}
	});
};


exports.findOne = function(req, res){
	handleDisconnect();
	handleDisconnect();
	var userid = req.session.user;
	console.log(userid);
	var sqlQuery ="Select * from tb_users where userId = 2";
	
	connection.query(sqlQuery, function(err,result){
		if(err){
			console.log(err);
			connection.destroy();
			res.send({
				success: false,
				status: err
			})
		}
		else{
			connection.destroy();
			res.send({
				success: true, 
				status: "",
				data:result
			});
		}
	});

}

exports.newContact = function(req, res) {
	handleDisconnect();
	var sqlQuery ="INSERT INTO tb_contacts (FirstName,LastName,Email,Mobile,jobTitle,Location,Notes,createdDate,userId) VALUES ('" + req.body.F_name + "',' "+  req.body.L_name + "','" + req.body.Emailadd +"','" + req.body.Mobile + "','" + req.body.J_title +"','" + req.body.Location + "','"+ req.body.Notes +"',NOW(),2)";
	
	connection.query(sqlQuery,function(err, result) 
	{                                                      
		if (err) {
			console.log(err);
			connection.destroy();
			res.send({
				success: false, 
				status: "Contact Insertion Failed " + err
			});
		}
		else
		{
			connection.destroy();
			res.send({
				success: true, 
				status: "Contact Inserted!!"
			});
		}	  
	});	
};



exports.updateContact = function(req, res) {
	handleDisconnect();
	var querySql = "Update tb_contacts set FirstName = '"+req.body.F_name+"', LastName='"+req.body.L_name+"', Email='"+req.body.Emailadd+"', Mobile='"+req.body.Mobile+"', jobTitle='"+req.body.J_title+"', Location='"+req.body.Location+"', Notes='"+req.body.Notes+"', modifiedDate=NOW() Where Id ="+req.body.Id;
	connection.query(querySql,function(err, result) 
	{                                                      
		if (err) {
			console.log(err);
			connection.destroy();
			res.send({
				success: false, 
				status: "Contact Insertion Failed!!"
			});
		}
		else
		{
			console.log('Changed ' + result.changedRows + ' rows');	
			connection.destroy();
			res.send({
				success: true, 
				status: "Contact Updated!!"
			});
		}
	});	 
};


exports.updateUserProfile = function(req, res){
	handleDisconnect();
	console.log(req.body.PhoneNUm);
	var querySql="Update tb_users set userName ='" + req.body.Username + "', userPassword ='" + req.body.Password +"', userFirstName ='" + req.body.F_name +"', userLastName = '" + req.body.L_name + "', userEmail='"+ req.body.Email +"', userPhone ='"+ req.body.PhoneNUm + "' where userId ="+req.body.Id;
	connection.query(querySql,function(err, result) 
	{                                                      
		if (err) {
			console.log(err);
			connection.destroy();
			res.send({
				success: false, 
				status: "Contact Insertion Failed!!"
			});
		}
		else
		{
			console.log('Changed ' + result.changedRows + ' rows');	
			connection.destroy();
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