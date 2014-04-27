
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


exports.index = function(req, res){
	console.log(res);
	var EtenLijst = require("../models/eten").EtenLijst;
	EtenLijst.find({}, function(err, eten){
		console.log(eten);
	res.render('index', {title: "Beans Bar Menu", food: eten});
	});

}

//http://stackoverflow.com/questions/18008479/node-js-wait-for-multiple-async-calls
//http://mherman.org/blog/2013/11/11/user-authentication-with-passport-dot-js/#.U1gM4Pl_tqU