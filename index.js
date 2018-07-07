var express 	= require("express");
var request 	= require("request");
var mongoose 	= require("mongoose");
var app			= express();
var	User        = require("./models/user");


const IP = '10.123.14.21';
const PORT = 8080;
const APP_TITLE = 'Face Auth';

app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/face-auth');



/* Routes */
app.get('/', function(req, res) 
{
    res.redirect('/index');
});

app.get('/index', function(req, res) 
{
    res.render('index', { title: APP_TITLE});
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
