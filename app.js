var http = require('http');
var Express =require('express');
var Path = require('path');
var Routes = require('./routes');
var app = Express();
var request = require('request-json');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var fileUpload = require('express-fileupload');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(fileUpload());
app.use(Express.static(__dirname + '/public'));
app.use('/static', Express.static(__dirname + '/public'));
app.enable('trust proxy');
app.set('port', process.env.PORT || 8080);

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
	 if (req.session && req.session.user) { // Check if session exists
	 	/*User.findOne({ email: req.session.user.email }, function (err, user) {
	      if (!user) {
	        // if the user isn't found in the DB, reset the session info and
	        // redirect the user to the login page
	        req.session.reset();
	        res.redirect('/login');
	      } else {
	        // expose the user to the template
	        res.locals.user = user;*/
    	res.sendFile(Path.join(__dirname + '/contacts.html'));
    } else {
    	res.redirect('/login');
  	}
});

app.get('/login', function (req, res) {
	req.session.reset();
  	res.sendFile(Path.join(__dirname + '/login.html'));
});

app.get('/password', function (req, res) {
  res.sendFile(Path.join(__dirname + '/password.html'));
});

app.get('/bulkmessaging', function (req, res) {
	 if (req.session && req.session.user) { // Check if session exists
    	res.sendFile(Path.join(__dirname + '/index.html'));
    } else {
    	res.redirect('/login');
	}
});

app.get('/messenger', function (req, res) {
	 if (req.session && req.session.user) { // Check if session exists
    	res.sendFile(Path.join(__dirname + '/messenger.html'));
    } else {
    	res.redirect('/login');
	}
});

app.get('/contacts', function(req,res){
	 if (req.session && req.session.user) { // Check if session exists
    	res.sendFile(Path.join(__dirname + '/contacts.html'));
    } else {
    	res.redirect('/login');
	}
});

app.get('/newcontact', function(req,res){
	 if (req.session && req.session.user) { // Check if session exists
    	res.sendFile(Path.join(__dirname + '/newcontact.html'));
    } else {
    	res.redirect('/login');
	}
});

app.get('/importContact', function(req, res){
	 if (req.session && req.session.user) { // Check if session exists
    	res.sendFile(Path.join(__dirname + '/importContact.html'));
        
    } else {
    	res.redirect('/login');
	}
});
app.get('/importContacts', function(req, res){
     if (req.session && req.session.user) { // Check if session exists
        res.sendFile(Path.join(__dirname + '/importContact.html'));
        
    } else {
        res.redirect('/login');
    }
});

app.get('/sendSMSSingle', function(req, res){
	 if (req.session && req.session.user) { // Check if session exists
    	res.sendFile(Path.join(__dirname + '/sendSMSSingle.html'));
    } else {
    	res.redirect('/login');
	}
});

app.get('/sendSMSGroup', function(req, res){
	 if (req.session && req.session.user) { // Check if session exists
    	res.sendFile(Path.join(__dirname + '/sendSMSGroup.html'));
    } else {
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



//app.post('/ImportContact', Routes.)

//APIs
app.post('/login', Routes.loginUser);
app.get('/smsList', Routes.getSMSList);
app.post('/sendMultipleSMS', Routes.sendMultipleSMS);
app.post('/SendSMSSingle', Routes.SendSMSSingle);

app.get('/getContacts', Routes.getContacts);
app.get('/getSingleContact', Routes.getSingleContact);
app.post('/newContact', Routes.newContact);
app.post('/updateContact', Routes.updateContact);

//Starting Server
http.createServer(app).listen(app.get('port'), function(){
	console.log("Application started at "+app.get('port'));
});