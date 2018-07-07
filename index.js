var express 	= require("express");
var request 	= require("request");
var mongoose 	= require("mongoose");
var app			= express();
var	User        = require("./models/user");

var Rehive = require("rehive");
var config = {apiVersion: 3, apiToken: 'd73e226d213fdb761533666a4ca9e4201cbb06a913e5b9449f79e668fae3fce9'};
const r = new Rehive(config);

const IP = '10.123.14.21';
const PORT = 8080;
const APP_TITLE = 'Face Auth';

app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://' + IP + '/face-auth');

	
/* Routes */
app.get('/', function(req, res) 
{
	//login

	r.auth.login({
	    user: "eric50818244@gmail.com",
	    company: "ericlin94",
	    password: "eric40418204"
	}).then(function(user){
    	
	},function(err){
    
	})
	
	//transaction

	r.transactions.createTransfer(
	{
	    amount: 50*100,
	    recipient: "LP547887@gmail.com",
	    currency: "USD"

	}).then(function(res){
	    console.log(res)
	},function(err){
	    console.log(err)
	})
	
    res.redirect('/index');
});

app.get('/index', function(req, res) 
{
    res.render('index', { title: APP_TITLE });
});

app.get('/login', function(req, res) 
{
    res.render('login', { title: APP_TITLE });
});

app.get('/mockuser/:name', function(req, res)
{
	var user = 
	{
		name: req.params.name,
		email: 'test123@fakeemail.com',
		phone: '978-666-6666',
		password: 'thestrongestpasswordintheworld',
		path: req.params.name.tolower + '/' 
	};

	User.create(user, function(err, user)
	{
	    if(err)
	    {
	        console.log("Gee Gee!!!!");
	        console.log(err);
	    } 
	    else 
	    {
	        console.log("User " + req.params.name + " is added to the database.");
	    }
    });
    res.redirect('/index');
});

app.listen(PORT, IP, function() 
{
    console.log("Server started on " + IP + ":" + PORT + ".");
});
