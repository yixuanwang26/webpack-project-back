
var Schema = require('../db').Schema;

exports.idsSchema = new Schema({
    name: String,
    id: Number,
}); 