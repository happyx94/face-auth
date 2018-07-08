var express 	= require("express");
var request 	= require("request");
var mongoose 	= require("mongoose");
var app			= express();
var	User        = require("./models/user");
var bodyparser=require("body-parser");



var Rehive = require("rehive");

var config = {apiVersion: 3, apiToken: 'd73e226d213fdb761533666a4ca9e4201cbb06a913e5b9449f79e668fae3fce9'}; 

var r = new Rehive(config);

const IP = 'localhost';
const PORT = 8080;
const APP_TITLE = 'Face Auth';

app.use(express.static("public"));
app.set('view engine', 'ejs');
//mongoose.connect('mongodb:');
app.use(bodyparser.urlencoded({extended:true})); 


/* Routes */
app.get('/', function(req, res) 
{
    res.redirect('/index');
});

//login routes
app.get('/login',function(req,res){
	res.render('login')
})
app.post('/login',function(req,res){
	res.render('options')
})
//transaction Root
app.get('/transaction',function(req,res){
	res.render('transaction')
})
app.post('/transaction',function(req,res){
	//if face-auth success
	console.log(req.body.Amount)
	console.log(req.body.Recipient)
	console.log(req.body.CurrencyType)
	r.transactions.createTransfer(
	{
	    amount: req.body.Amount*100,
	    recipient: req.body.Reciepiant,
	    currency: req.body.CurrencyType

	}).then(function(res2){
	    console.log(res2)
	    res.send('success')
	},function(err){
	    console.log(err)
	    res.send(err)
	})
})

app.get('/index', function(req, res) 
{
    res.render('index', { title: APP_TITLE });
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
