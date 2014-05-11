
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var async = require('async');
var faye = require('faye');

mongoose.connect('mongodb://127.0.0.1/beans');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:connection to db has failed'));
db.once('open',function callback(){
	console.log('Connection with db has been succesful!');
});

//MONGOOSE MODELS
//var food = db.model('EtenLijst', require('./models/eten').EtenLijst);
var eten = require('./models/eten');
//console.log(typeof eten.EtenLijst);
var drinken = require('./models/drinken');
var bestellingen = require('./models/bestelling');

var Bestelling =  new mongoose.Schema({
	orderid: String,
	datum: String,
	tijd: String,
	tafelnummer: Number,
	bestelling: Object
});

var order = mongoose.model('orders', Bestelling);


//
var app = express();

// all environments
app.configure(function(){
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.bodyParser());
app.use(express.session({cookie:{maxAge: 60000}}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//functies
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

//APP GET GEDEELTE

app.get('/', routes.index);
app.get('/order', routes.order);
app.get('/feedback', routes.feedback);
//app.get('/', ensureAuthenticated, routes.login);
app.get('/users', user.list);

//BESTELLING OPSLAAN AJAX APP.POST
//1. OP 'BESTEL' IN TABEL CLIENTORDERS

/*var BestellingKlant =  new mongoose.Schema({
	_id: String,
	bestelling: Object
});

var clientorder = mongoose.model('clientorders', BestellingKlant);

app.post('/', function(req, res){
	var obj = {};
	console.log(req.body.bestelling);

	var id = req.body._id;
	var bestelling = req.body.bestelling;
	//https://www.youtube.com/watch?v=uZqwHfNIf8M
	new clientorder({
		_id: id,
		bestelling: bestelling
	}).save(function(err, doc){
		if(err)
		{
			res.json(err);
		}
		else
		{
			console.log('succesful!');
			order.count(function(err,c){
				console.log('count is' + c);
			});
		}
	});

});*/

//2. OP PRINT IN TBL ORDERS

app.post('/order', function(req, res){
	var obj = {};
	console.log(req.body.order);

	var id = req.body.id;
	var bestelling = req.body.order;
	var tafelnummer = req.body.tafelnummer;
	var datum = req.body.datum;
	var tijd = req.body.tijd;
	//https://www.youtube.com/watch?v=uZqwHfNIf8M
	new order({
		orderid: id,
		datum: datum,
		tijd: tijd,
		tafelnummer: tafelnummer,
		bestelling: bestelling
	}).save(function(err, doc){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log('succesful!');
		}
	order.count(function(err,c){
				console.log('count is ' + c);
				res.json(c);
			});	
	});

});

//tellen hoeveel docs in collection zitten.
//http://mongoosejs.com/docs/api.html#model_Model.count

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

bayeux.attach(server);
server.listen(3000);

