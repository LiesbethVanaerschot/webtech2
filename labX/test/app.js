
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/beans');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:connection to db has failed'));
db.once('open',function callback(){
	console.log('Connection with db has been succesful!');
});

//MONGOOSE MODELS
//var food = db.model('EtenLijst', require('./models/eten').EtenLijst);
var food = require('./models/eten');
console.log(typeof food.EtenLijst);


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
//app.get('/', ensureAuthenticated, routes.login);
app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


