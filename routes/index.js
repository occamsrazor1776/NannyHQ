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
	//console.log(sqlQuery);
	
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
				//console.log(user);
				//req.session.user = user;
				connection.destroy();
				res.redirect('/');
			}
		}
	});

	
	//res.redirect('/');
};

var client = require('twilio')(config.twilio.sid, config.twilio.token);
exports.getSMSList = function(req, res) {
	
	client.sms.messages.list(function(err, data) {
		res.send({
					success: true, 
					status: err,
					data:data
				});
		//data.smsMessages.forEach(function(sms) {
		//	console.log(sms);
		//});
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
	var userTo = req.query.UserTo;
	var userFrom = req.query.UserFrom;
	var _dt = req.query.date;
	handleDisconnect();
	//var querySql = "select * from tb_messagedetail where userFromId ="+ userIdFrom +" and userId =" + userIdTo +" and DATE(sendDate) = '"+_dt+ "' order by sendDate;"
	
	//var querySql="SELECT t1.* FROM db_naan.tb_messagedetail t1 where userToPhone ='"+userTo+"' and userFromPhone  ='"+userFrom;
	//querySql+="' and DATE(sendDate) IN (select distinct(DATE(t2.sendDate)) as sd from db_naan.tb_messagedetail t2  group by sendDate order by sendDate)";

	var querySql =" select * from tb_messagedetail where userToPhone ='"+userTo+"'  and userFromPhone ='"+userFrom+"'";
	querySql+=" or  userFromPhone ='"+userTo+"'   and userToPhone ='"+userFrom+"'  and DATE(sendDate) IN (select distinct(DATE(t2.sendDate)) as sd from tb_messagedetail t2  group by sendDate order by sendDate)";
	querySql+=" and sendingTime IN (select distinct(t2.sendingTime) as sd from tb_messagedetail t2 group by sendingTime order by sendingTime)";
	querySql +=" order by sendDate";
	
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
		//console.log(result)	;
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


exports.getMessagesRecieved = function(req, res){
	var userTo = req.query.UserTo;
	var userFrom = req.query.UserFrom;
	var _dt = req.query.date;
	handleDisconnect();
	var querySql="SELECT t1.* FROM db_naan.tb_messagedetail t1 where userFromPhone ='"+userTo+"' and userToPhone  ='"+userFrom;
	querySql+="' and DATE(sendDate) IN (select distinct(DATE(t2.sendDate)) as sd from db_naan.tb_messagedetail t2  group by sendDate order by sendDate)";
	
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
		//console.log(result)	;
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
exports.getmessengerContacts1 = function(req, res) {
	handleDisconnect();
	//var userid = 22 ;    //req.query.userFrom;
	var userid;// = 12;
	
	var user = req.session.user;
	user.forEach(function(element){
		console.log(element.userId);
		userid= element.userId;
	});

	
	var sqlquery ="select distinct t1.*, t2.messageText, t2.sendDate from tb_contacts t1 LEFT OUTER JOIN  tb_messagedetail t2 ON t1.Id = t2.userId";
	sqlquery+=" union select distinct   t1.*, t2.messageText, t2.sendDate from tb_contacts t1 RIGHT OUTER JOIN  tb_messagedetail t2 ON t1.Id = t2.userId";
	sqlquery+=" where t2.userFromId ="+userid +" order by sendDate desc, FirstName asc";	
	
	connection.query(sqlquery, function(err,result){
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
				status: "success",
				data:result
			});
		}
	});
};

exports.getmessengerContacts = function(req, res) {
	handleDisconnect();
	var userIdFrom =12// req.query.userFrom;


	
	//console.log(req.query.userFrom);
	var lastmsg =''; var format_date='';
	var sqlQ ="Select * from tb_contacts order by FirstName asc";
	var result1;
	var res1;
	var createtag;
	var dataSS;
	var res1;
	var arr = [];
	var arr1 = [];
	var datasend ={};

	connection.query(sqlQ, function(err, result)
	{		 
		if(err){
			connection.destroy();
			res.send({
				success: false, 
				status: err
			});
		}
		else{
			//console.log(result[0]);
			
		//	console.log(result);
			result1 = result;
			result.forEach(function(element){
				handleDisconnect();
				arr.push(JSON.stringify(element));
				var sqlQuery ="Select * from tb_messagedetail where userFromId="+ userIdFrom+" and userId = "+element.Id+"  order by sendDate desc LIMIT 1";	
			
				connection.query(sqlQuery, function(err, resp)
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
						res1 = resp;
						connection.destroy();
						//arr.push(JSON.stringify(res));
						if(resp.length != 0){
							resp.forEach(function(elem){
								arr1.push(JSON.stringify(elem));
							
								
							
								if(elem.messageText!=''){
									lastmsg = elem.messageText;
		              				var mDate =new Date(elem.sendDate);
			              			var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			              			format_date =  monthNames[mDate.getMonth()] +" "+mDate.getDate();
		              			}
		              			else{
		              				lastmsg = "No Recent Conversations";
		              			}
		              			createtag="<li class='messenger-list-item'><a data='" + element.Mobile+ "' id='"+element.Id+"' class='messenger-list-link' href='#0531871454' data-toggle='tab'>";
						        createtag+="<div class='messenger-list-avatar'><img class='rounded' width='40' height='40' src='img/nophoto.jpg' alt='" + element.FirstName + " " + element.LastName + "'>";
						        createtag+="</div><div class='messenger-list-details'><div class='messenger-list-date'>"+format_date  +"</div> ";
						        createtag+="<div class='messenger-list-name'>" + element.FirstName + " "+ element.LastName + "</div><div class='messenger-list-message'><small class='truncate'>"+lastmsg+ "</small>";
						        createtag+="</div><input type='hidden' class='hdnServiceCode' name='hiddennumber' value='" + element.Mobile + "'/></div></a></li>";
						      //  console.log(createtag);
						        dataSS+=createtag;
								
							});						
	              		}
	              		else{
	              			lastmsg = "No Recent Conversations";
	              			createtag="<li class='messenger-list-item'><a data='" + element.Mobile+ "' id='"+element.Id+"' class='messenger-list-link' href='#0531871454' data-toggle='tab'>";
						    createtag+="<div class='messenger-list-avatar'><img class='rounded' width='40' height='40' src='img/nophoto.jpg' alt='" + element.FirstName + " " + element.LastName + "'>";
						    createtag+="</div><div class='messenger-list-details'><div class='messenger-list-date'>"+format_date  +"</div> ";
						    createtag+="<div class='messenger-list-name'>" + element.FirstName + " "+ element.LastName + "</div><div class='messenger-list-message'><small class='truncate'>"+lastmsg+ "</small>";
						    createtag+="</div><input type='hidden' class='hdnServiceCode' name='hiddennumber' value='" + element.Mobile + "'/></div></a></li>";
						 //   console.log(createtag);
						    dataSS+=createtag;
						    console.log(createtag);
	              		}             		
								
					}
							   
				});
			});
			res.json({ data: createtag });		
		
		}
	});
};

exports.getLastMessage= function(req, res){
	var userIdTo = req.query.userTo;
	var userIdFrom = req.query.userFrom;
	handleDisconnect();
	var sqlQuery ="Select * from tb_messagedetail where userFromId="+ userIdFrom+" and userId = "+userIdTo+"  order by sendDate desc LIMIT 1";
	//console.log(sqlQuery);
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
				//console.log(result);
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

exports.searchCont = function(req, res){
	handleDisconnect();
	//console.log(req);
	var sqlQuery ="Select * from tb_contacts where  FirstName LIKE '%"+ req.query.SearchCont ;
	sqlQuery +="%' OR  LastName LIKE  '%"+ req.query.SearchCont+"%'";//  or Email LIKE '%"+req.query.SearchCont+"%'" ;
	//console.log(sqlQuery);
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
				//console.log(result);
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
			//console.log(result[0].userPassword);
			var data = {
	  		from: 'NannyHQ <me@samples.mailgun.org>',
			to: req.body.uName,
			subject: 'sending Password',
			//text: 'Here is user password for login, <br/> <b> Password : </b>'+ result[0].userPassword
			html : '<b>NannyHQ</b><br/>Here is user password for login, <br/> <b> Password : </b>'+ result[0].userPassword
			};
			//console.log( data);
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

exports.savemessageDetails = function (req, res){
	
    var dateFormat = require('dateformat');
    var mysqlTimestamp = dateFormat(req.body.date_created, "yyyy-mm-dd h:MM:ss");
    var msgDate = dateFormat(req.body.date_created, "yyyy-mm-dd");
    var msgTime = dateFormat(req.body.date_created, "h:MM:ss TT");
    

	handleDisconnect();
	var sqlQuery ="INSERT INTO tb_messagedetail (messageText,userToPhone,sendDate,userFromPhone,sendingDate,sendingTime,tb_messagedetail.desc,";
	sqlQuery+="MessageSid,SmsSid,AccountSid,MessagingServiceSid,NumMedia) values ('"+ req.body.Body +"','"+req.body.To;
	sqlQuery+="','"+mysqlTimestamp+"','"+req.body.from+"','"+msgDate+"','"+msgTime+"',NULL,'"+req.body.MessageSid+"','"+req.body.MessageSid+"','"+config.twilio.sid+"','"+req.body.MessagingServiceSid+"','1')";
	
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

//recieving sms
exports.message = function (request, response) {
  console.log(request.body); 
  response.send("<Response><Message>Hello</Message></Response>")
}; 

exports.SendSMSSingle = function(req, res) {
	var twilio = require('twilio');	
	var now = new Date();
	//var mysqlTimestamp = moment(Date.now()).format('LLL');

	var dateFormat = require('dateformat');
    var mysqlTimestamp = dateFormat(now, "yyyy-mm-dd h:MM:ss");
    var msgDate = dateFormat(now, "yyyy-mm-dd");
    var msgTime = dateFormat(now, "h:MM:ss TT");
	
	var client = new twilio.RestClient(config.twilio.sid, config.twilio.token);
	
	var smsFrom ="+"+config.twilio.from;
	console.log(smsFrom);
	console.log(req.body.Mobile);
	console.log(req.body.Message);
	client.messages.create({

		to: req.body.Mobile,
		from: smsFrom,
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
				var sqlQuery ="INSERT INTO tb_messagedetail (messageText,userId,userToPhone,sendDate,userFromPhone,userFromId,sendingDate,sendingTime) values ('";
				sqlQuery+= req.body.Message +"',"+ req.body.useridTO +",'"+req.body.Mobile+"','"+ mysqlTimestamp +"','+"+config.twilio.from+"',"+ req.body.userID +",'"+msgDate+"','"+msgTime+"')";
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
		}
		else {
			result: "Message Sending failed."
		}	
	});
};

exports.SendSMSSingleBulk = function(req, res) {
	var twilio = require('twilio');	
	var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
	console.log(mysqlTimestamp);
	
	var client = new twilio.RestClient(config.twilio.sid, config.twilio.token);
	
	console.log(req.body);

	client.messages.create({

		to: req.body.Mobile,
		from: '+' + config.twilio.from,
		body:  req.body.Message//,
		

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
			result: "Message Sending failed."
		}	

	});
};





exports.SendSMSBulk = function(req, res) {
	var twilio = require('twilio');	
	var client = new twilio.RestClient(config.twilio.sid, config.twilio.token);
	var allconts = req.body.conts;
	var docreq;
	console.log(allconts);
	var num1 = req.body.nums;
	var mobile;
	var SMSmsg;
	for(var j = 1; j<allconts.length; j++){
		mobile = num1[j-1];
		
		var newallcontacts =  allconts[j];
		num1 = newallcontacts[2].replace('(','');
     	num1 = num1.replace(') ','');
    	num1 = num1.replace(' ', '');
    	num1 = num1.replace('-', '');
    	docreq=newallcontacts[4].replace('\r', '');
    	mobile="+91" + num1;
    	SMSmsg ="Hello "+newallcontacts[0] +" "+ newallcontacts[1] + ", we still haven't received your " +  docreq+" that expired on ";
      	SMSmsg+= newallcontacts[3]+". Please reply to this message with an updated copy or fax to (954) 440-7348. Thank you";
      	var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
     	 console.log(mobile);
      	console.log(SMSmsg);
      	console.log(config.twilio.from);
		client.messages.create({

			to: mobile,
			from: '+' + config.twilio.from,
			body:  SMSmsg//,	
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
				result: "Message Sending failed."
			}	
		});
	}
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
			//console.log(result[0]);
			connection.destroy();
			res.send({
				success: true, 
				status: "",
				data:result
			});
		}

	});
};


exports.getContacts1= function(req, res) {
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
			//console.log(result[0]);
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
	var user = req.session.user;

	var userid = req.session.user;
	user.forEach(function(element){
		userid = element.userId;
	});
	var user_id = req.body.userid;
	//console.log("session " + userid.userId);
	var sqlQuery ="Select * from tb_users where userId = "+ userid;

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
	//console.log(req.query.phone);
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

exports.getnamephone= function(req,res){
	handleDisconnect();
	var sqlquery="Select Mobile,FirstName,LastName from tb_contacts";
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
	//console.log(userid);
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

exports.newContacts = function(req,res){
	handleDisconnect();
	var contval = req.body.conts;
	var csvval = contval;
	var m_name="";
    var cmobile;
    
    var count = 0 ;
    var outp = new Array();   
    var obj = {};         
    var j; 
    var arr = new Array(); 

    var sqlquery="insert into tb_contacts (FirstName,LastName,Email,Mobile,jobTitle,Location,Notes,createdDate,userId) VALUES ";
    var sqlquery1='';
    var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');


   	var sqlQ ="Select Mobile from tb_contacts";
    connection.query(sqlQ, function(err, result)
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
			result.forEach(function(item){	
				outp.push(item.Mobile);
			});
			//arr = outp;
			for( j = 1; j <  csvval.length-1; j++){
				var csvvalue = csvval[j]; 
				var num1 ='';
				num1 = csvvalue[6].replace(' (','');
			    num1 = num1.replace(') ','');
		    	num1 = num1.replace(' ', '');
		    	num1 = num1.replace('-', '');
		    	num1 = num1.replace('\r', '');
		    	num1 = "+1" + num1;		    	
	    		if(outp.length > 0 ) {
	    			if(outp.indexOf(num1) == -1){
		    			sqlquery1 = " ('"+ csvvalue[0] +"','"+ csvvalue[1] +"','','"+num1 +"','','"+ csvvalue[2] +" "+ csvvalue[3] +" "+ csvvalue[4] +""+ csvvalue[5] +"','','"+mysqlTimestamp+"',0),";
		    			sqlquery +=sqlquery1;
		    		}
		    	}
	    		else
	    		{
	    			sqlquery1 = " ('"+ csvvalue[0] +"','"+ csvvalue[1] +"','','"+num1 +"','','"+ csvvalue[2] +" "+ csvvalue[3] +" "+ csvvalue[4] +""+ csvvalue[5] +"','','"+mysqlTimestamp+"',0),";
		    		sqlquery +=sqlquery1;
	    		}	    	
		    }
		    sqlquery=sqlquery.substring(0,sqlquery.length-1);
		    handleDisconnect();
		    console.log(sqlquery);
		    var errorno;
		    connection.query(sqlquery, function(err, result)
			{		 
				if(err){
					console.log(err.errno);	
								
					connection.destroy();
					res.send({
						status: err,
						success: false
					});
				}
				else{
					connection.destroy();
					res.send({
						success: true, 
						status: "Contacts Inserted and contacts that already exists are ignored!!"
					});
				}
			});
		}
	});   
   
}


exports.updateContact = function(req, res) {
  	handleDisconnect();
	var querySql = "Update tb_contacts set FirstName = '"+req.body.F_name+"', LastName='"+req.body.L_name+"', Email='"+req.body.Emailadd+"', Mobile='"+req.body.Mobile+"', jobTitle='"+req.body.J_title+"', Location='"+req.body.Location+"', Notes='"+req.body.Notes+"'  Where Id ="+req.body.Id;

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
			//console.log('Changed ' + result.changedRows + ' rows');	
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
	//console.log(req.body.PhoneNUm);
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
			//console.log('Changed ' + result.changedRows + ' rows');	
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
		//	console.log(sampleFile.name);  
			
			res.send({
				success: true,
				result: " Contacts Uploaded successfully."
			});
		}

	});
};