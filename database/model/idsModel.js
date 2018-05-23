var db = require('../db').db;
var mongoose = require('../db').mongoose;
var idsSchema = require('../schema/idsSchema').idsSchema;

exports.idsModel = db.model('ids', idsSchema);

