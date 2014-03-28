
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.ask = function(req, res){	
  res.render('ask', { 
  	title: 'Ask A Question',
  	 });
};

exports.allquestions = function(req, res){	
  res.render('allquestions', { 
  	title: 'All Questions',
  	 });
};