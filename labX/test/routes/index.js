
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
	/*if(typeof res === 'object')
	{
		etenArray = [];
		var i = 0;
		while(res["eten" + i])
			{
				etenArray.push(res["eten" + i]);
				i++;
				console.log(typeof etenArray);
				return etenArray;
				//etenArray.render('index', {etenArray: eten});
			}	
		console.log	
	}
	else
	{
		res.render('index', {res: eten});
	}*/
	
	res.render('index', {title: "eten", food: eten});
	});
}
/*exports.EtenLijst = function(req, res){
  EtenLijst.find({}, function(err, eten){
	eten.render('index', {eten: eten});
	console.log(eten);
});
};

/*var mongoose = require('mongoose');
EtenLijst = mongoose.model('EtenLijst');

EtenLijst.find({}, function(err, data){
	console.log(data);
});*/