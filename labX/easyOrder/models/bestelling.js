var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Bestelling = new Schema({
	_id: String,
	bestelling: Object	
});

var BestellingLijst = mongoose.model('BestellingLijst', Bestelling);
module.exports = { BestellingLijst: BestellingLijst};