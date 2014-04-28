
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Eten = new Schema({
	_id: String,
	cat: String
},{collection:'eten'});

var EtenLijst = mongoose.model('EtenLijst', Eten);
module.exports = { EtenLijst: EtenLijst};



//http://stackoverflow.com/questions/19886736/how-to-find-documents-with-nodejs-and-mongoose-why-there-is-no-result
//http://www.tutorialindustry.com/node-js-mongodb-tutorial-for-beginners
