var http = require('http');
var express =require('express');
var Path = require('path');
var Routes = require('./routes');
var request = require('request-json');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var fileUpload = require('express-fileupload');

var app = express();
var router = express.Router();

app.set("view options", {layout: false});  
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html');
app.set('views', __dirname + "/public/views/pages");
 
/*app.all("*", function(req, res, next) {
    var request = req.params[0];
    if((request === "/")||(request === "")) {
		res.redirect('/contacts');
	}
	else {
	    if((request.substr(0, 1) === "/")&&(request.substr(request.length - 4) === "html")) {
	         request = request.substr(1);
	         res.render(request);
	     } else {
	         next();
	     }
	 }

});*/

var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

app.enable('trust proxy');
app.set('port', process.env.PORT || 8080);

app.use(fileUpload());

app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

function requireHTTPS(req, res, next) {
    if (req.secure) {
        next();
    } else {
        //FYI this should work for local development as well
        return res.redirect('https://' + req.get('host') + req.url);
    }
}

//Pages
app.get('/', function(req, res) {
    console.log(req.session.user);
	 if (req.session && req.session.user) { 
        console.log('enter');
        console.log(req.session.user.userEmail);
        // Check if session exists
	 	/*User.findOne({ email: req.session.user.email }, function (err, user) {
	      if (!user) {
	        // if the user isn't found in the DB, reset the session info and
	        // redirect the user to the login page
	        req.session.reset();
	        res.redirect('/login');
	      } else {
	        // expose the user to the template
	        res.locals.user = user
        };*/
    	res.render('contacts.html', {Title:'Contacts'});
    } 
    else {
    	res.redirect('/login');
  	}
});

app.get('/login', function (req, res) {
	req.session.reset();
  	res.render('login.html', {Title:'Log In'});
});

app.get('/password', function (req, res) {
  res.render('password.html', {Title:'Reset Your Password'});
});



app.get('/bulkmessaging', function (req, res) {
	 if (req.session && req.session.user) { // Check if session exists
    	res.render('index.html', {Title:'Bulk Messaging'});
    } else {
    	res.redirect('/login');
	}
});

app.get('/messenger', function (req, res) {
	 if (req.session && req.session.user) { // Check if session exists
    	res.render('messenger.html', {Title:'Messenger'});
    } else {
    	res.redirect('/login');
	}
});

app.get('/contacts', function(req,res){
	 if (req.session && req.session.user) { // Check if session exists
    	res.render('contacts.html', {Title:'Contacts'});
    } else {
    	res.redirect('/login');
	}
});

app.get('/newcontact', function(req,res){
	 if (req.session && req.session.user) { // Check if session exists
    	res.render('newcontact.html', {Title:'New Contact'});
    } else {
    	res.redirect('/login');
	}
});

app.get('/search', function (req,res){
    if(req.session && req.session.user){
        res.render('search.html',{Title: 'Search'});
    }
    else{
        res.redirect('/login');
    }
})

app.get('/profile', function(req,res){
     if (req.session && req.session.user) { // Check if session exists
        res.render('Profile.html', {Title:'Profile'});
    } else {
        res.redirect('/login');
    }
});

app.get('/importContact', function(req, res){
	 if (req.session && req.session.user) { // Check if session exists
    	res.render('importcontact.html', {Title:'Import Contacts'});
        
    } else {
    	res.redirect('/login');
	}
});
app.get('/importContacts', function(req, res){
     if (req.session && req.session.user) { // Check if session exists
        res.render('importcontact.html', {Title:'Import Contacts'});
        
    } else {
        res.redirect('/login');
    }
});

app.get('/sendSMSSingle', function(req, res){
	 if (req.session && req.session.user) { // Check if session exists
    	res.render('sendsmssingle.html', {Title:'Send SMS / MMS 1:1'});
    } else {
    	res.redirect('/login');
	}
});

app.get('/sendSMSGroup', function(req, res){
	 if (req.session && req.session.user) { // Check if session exists
    	res.render('sendsmsgroup.html', {Title:'Send SMS / MMS to List or a group'});
    } else {
    	res.redirect('/login');
	}
}); 

app.get('/report', function(req, res){
    if(req.session && req.session.user){
        res.render('report.html', {Title : 'Displaying Log of sms'});
    }
    else{
        res.redirect('/login');
    }
});

app.post('/importContact', function(req, res) {
    var sampleFile;
 
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
  
    sampleFile = req.files.sampleFile;
    console.log(sampleFile);
    sampleFile.mv('files/' + sampleFile.name, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
           // console.log(res);
            res.send('importContact');
        }
    });
});

var path = require('path');

 
// ...
app.post('/uploadPhoto', function (req, res) {
     //console.log(req);
      if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
  
    sampleFile = req.files.hddProPic;
    console.log(req.files.name);
    sampleFile.mv('uploads/' + sampleFile.name, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
           // console.log(res);
            res.send('importContact');
        }
    });

});

//app.post('/ImportContact', Routes.)

//APIs

//app.post('/savemessages',Routes.savemsg);
app.get('/searchC', Routes.searchC);
app.get('/getMessaegeDates', Routes.getMessaegeDates);
app.post('/forgot',Routes.sendMail);
app.get('/getUserDetailsPhone', Routes.getUserDetailsPhone);
app.get('/getmessngerProfile',Routes.getmessngerProfile);
app.post('/login', Routes.login);
app.get('/smsList', Routes.getSMSList);
app.post('/sendMultipleSMS', Routes.sendMultipleSMS);
app.post('/SendSMSSingle', Routes.SendSMSSingle);
app.post('/SendSMSSingleBulk', Routes.SendSMSSingleBulk);
app.get('/getMessagesSent', Routes.getMessagesSent);
app.get('/getContacts',  Routes.getContacts);
app.get('/getSingleContact', Routes.getSingleContact);
app.post('/newContact', Routes.newContact);
app.post('/updateContact', Routes.updateContact);
app.get('/getProfile',Routes.LoginProfile);
app.get('/getrole', Routes.roles);
app.post('/updateProfile', Routes.updateUserProfile);

//Starting Server
http.createServer(app).listen(app.get('port'), function(){
	console.log("Application started at "+app.get('port'));
});