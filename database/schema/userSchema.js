
var Schema = require('../db').Schema;

exports.userSchema = new Schema({
    userId: Number,
    userName: String,
    sex: String,
    birthday: Date,
    phone: String,
    email: String,
    identityCardId: String,
    enableFlag: String,
    password: String,
    versionNumber: Number,
}); 