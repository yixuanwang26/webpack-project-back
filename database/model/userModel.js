
var db = require('../db').db;
var mongoose = require('../db').mongoose;
var userSchema = require('../schema/userSchema').userSchema;

var userModel = db.model('users', userSchema);
var idsModel = require('../model/idsModel').idsModel;

exports.saveData = function save(data, callback) {
    idsModel.findOneAndUpdate({ name: 'user' }, { $inc: { id: 1 } }, { new: true }, function (err, result) {
        if (err) {
            callback(false, err);
        }
        data.userId = result.id;
        data.versionNumber = 1;
        userModel.create(data, function (error, result) {
            if (error) {
                callback(false, error);
            } else {
                callback(true, result);
            }
        });
    });

}

exports.queryData = function query(data, callback) {
    userModel.find(data, function (error, result) {
        if (error) {
            callback(false, error);
        } else {
            callback(true, result);
        }
    })
}

exports.submitData = function submit(data, callback) {
    if(data.__status === 'add') {
        delete data.__status;
        idsModel.findOneAndUpdate({ name: 'user' }, { $inc: { id: 1 } }, { new: true }, function (err, result) {
            if (err) {
                callback(false, err);
            }
            data.userId = result.id;
            data.versionNumber = 1;
            userModel.create(data, function (error, result) {
                if (error) {
                    callback(false, error);
                } else {
                    callback(true, result);
                }
            });
        });
    }else if(data.__status === 'update') {
        delete data.__status;
        userModel.find({ userId: data.userId }, function(error, result) {
            if (error) {
                callback(false, error);
            }else if(result.length === 0){
                callback(false, '数据不正确，请刷新页面后重试');
            }else if(result.length > 1){
                callback(false, '数据重复，请联系管理员');
            }else if(result[0].versionNumber !== data.versionNumber) {
                callback(false, '版本号不一致，请刷新界面后重试');
            }else {
                delete data._id;
                userModel.findOneAndUpdate({ userId: result[0].userId }, { ...data, versionNumber: result[0].versionNumber + 1 }, { new: true }, function (error, result) {
                    if (error) {
                        callback(false, error);
                    } else {
                        callback(true, result);
                    }
                });
            }
        })
    }
}

exports.updateData = function update(data, callback) {
    userModel.find({ userId: data.userId }, function(error, result) {
        if (error) {
            callback(false, error);
        }else if(result.length === 0){
            callback(false, '数据不正确，请刷新页面后重试');
        }else if(result.length > 1){
            callback(false, '数据重复，请联系管理员');
        }else if(result[0].versionNumber !== data.versionNumber) {
            callback(false, '版本号不一致，请刷新界面后重试');
        }else {
            delete data._id;
            userModel.findOneAndUpdate({ userId: result[0].userId }, { ...data, versionNumber: result[0].versionNumber + 1 }, { new: true }, function (error, result) {
                if (error) {
                    callback(false, error);
                } else {
                    callback(true, result);
                }
            });
        }
    })
    
}

exports.removeData = function remove(data, callback) {
    userModel.remove(data, function (error, result) {
        if (error) {
            callback(false, error);
        } else {
            callback(true, result);
        }
    })
}



