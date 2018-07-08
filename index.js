/* ----- Global Constants ----- */
const DB_HOST = 'localhost:27017';
const IP = process.env.IP;
const PORT = process.env.PORT;
const APP_TITLE = 'Face Auth';
const R_COMPANY	= 'ericlin94';

/* ------ Import Modules ------ */
var express 	= require("express");
var request 	= require("request");
var mongoose 	= require("mongoose");
var multer		= require('multer');
var bodyParser	= require('body-parser');
var face 		= require("./face-recognition");
var Rehive 		= require("rehive");
var	User        = require("./models/user");
var bodyparser=require("body-parser");


/* ------- Initializtion ------- */
var app			= express();
var r 			= new Rehive({ apiVersion: 3, apiToken: 'd73e226d213fdb761533666a4ca9e4201cbb06a913e5b9449f79e668fae3fce9' });
var Storage = multer.diskStorage(
{
    destination: function (req, file, callback) { callback(null, "./images"); },
    filename: function (req, file, callback) { callback(null, req.body.username); }
});
var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyparser.urlencoded({extended:true})); 
app.set('view engine', 'ejs');
mongoose.connect('mongodb://' + DB_HOST + '/face-auth', { useNewUrlParser: true });


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

app.get('/login', function(req, res) 
{
    res.render('login', { title: APP_TITLE });
});

app.get('/register', function(req, res) 
{
    res.render('register', { title: APP_TITLE });
});

app.get('/auth/:user', function(req, res) 
{
    res.render('auth', { title: APP_TITLE });
});

app.post("/register/upload", function (req, res) 
{
    upload(req, res, function (err) 
    {
        if (err) 
        {
        	console.log(err);
            return res.end("Something went wrong!");
        }
        
        face.addModel(req.body.username, './images/' + req.body.username, function(err, res)
        {
        	if(err)
        	{
        		console.log('error');
        	}
        	else
        	{
        		var user = 
				{
					Username: req.body.username,
					password: req.body.password
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
	        			console.log("User " + user.Username + " is added to the database.");
					}
    			});
        		console.log(res);
        	}
        });
        return res.redirect("/options");
    });
});

app.listen(PORT, IP, function() 
{
    console.log("Server started on " + IP + ":" + PORT + ".");
});
