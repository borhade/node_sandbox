var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var myschema = new Schema({
        firstname:'String',
        lastname:'String'
});

module.exports = mongoose.model('mymodel',myschema);  